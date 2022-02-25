import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col, UncontrolledPopover, PopoverHeader, PopoverBody,
} from 'reactstrap';

import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { BASE_URL, ListOfReferenceNames, referenceToIgvTrack } from '../constants/constants';

import BamInstance from '../components/IGV/BamInstance';
import {
  searchReadGroupSets, getReferenceSet,
} from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import {
  LoadingIndicator,
  usePromiseTracker,
  trackPromise,
} from '../components/LoadingIndicator/LoadingIndicator';

import '../assets/css/VariantsSearch.css';

function BamBrowser() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const notifyEl = useRef(null);
  const [variantSet, setVariantSets] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const { promiseInProgress } = usePromiseTracker();
  const [options] = useState([]);
  const [selected, setSelected] = useState([]);
  const [readsTracks, setReadsTracks] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [igvTrackRefGenome, setIgvTrackRefGenome] = useState('');
  const [selectedChr, setSelectedChr] = useState('');

  /*
  Fetches reference set Name and sets referenceSetName
  * @param {string}... referenceSetId
  */
  function settingReferenceSetName(referenceSetId) {
    getReferenceSet(referenceSetId).then((data) => {
      setReferenceSetName(data.results.name);
    }).catch(() => {
      setReferenceSetName('Not Available');
    });
  }

  /*
  Build the dropdown for chromosome
  * @param {None}
  * Return a list of options with chromosome
  */
  function chrSelectBuilder() {
    const refNameList = [];

    ListOfReferenceNames.forEach((refName) => {
      refNameList.push(
        <option
          key={refName}
          value={refName}
        >
          {refName}
        </option>,
      );
    });
    return refNameList;
  }

  useEffect(() => {
    setSelected([]);
    options.length = 0;
    setReadsTracks([]);

    // Check for variant and reference name set on datasetId changes
    trackPromise(
      searchReadGroupSets(datasetId).then((data) => {
        setApiResponse(data);
        setVariantSets(data.results.total);
        setSelected([]);
        options.length = 0;
        data.results.readGroupSets.forEach((readgroupset) => {
          options.push({ label: readgroupset.name, value: readgroupset.id });
        });
        settingReferenceSetName(data.results.readGroupSets[0].readGroups[0].referenceSetId);
      }).catch(() => {
        setVariantSets('Not Available');
        setReferenceSetName('Not Available');

        // Do not show error message when datasetId is empty
        if (datasetId !== '') {
          notify(
            notifyEl,
            'No ReadGroupSets are available.',
            'warning',
          );
        }
      }),
    );
  }, [datasetId, options]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    const tracks = [];

    if (selected) {
      selected.forEach((readGroupSetId) => {
        const readGroupIds = [];

        apiResponse.results.readGroupSets.forEach((readGroupSet) => {
          if (readGroupSetId.value === readGroupSet.id) {
            readGroupSet.readGroups.forEach((readGroup) => {
              readGroupIds.push(readGroup.id);
            });
          }
        });

        const rawReferenceId = `["${referenceSetName}","${e.target.chromosome.value}"]`;
        const referenceId = btoa(rawReferenceId).replaceAll('=', '');

        const igvAlignmentObject = {
          sourceType: 'ga4gh',
          type: 'alignment',
          url: BASE_URL,
          name: readGroupSetId.label,
          referenceId,
          readGroupIds,
          readGroupSetIds: readGroupSetId.value,
          visibilityWindow: 1000,
          sort: {
            chr: `chr${e.target.chromosome.value}`,
          },
        };

        tracks.push(igvAlignmentObject);
      });
    }

    // Determine the reference genome for IGV based on the name of referenceSet
    Object.keys(referenceToIgvTrack).forEach((key) => {
      if (referenceToIgvTrack[key].includes(referenceSetName.toLowerCase())) {
        setIgvTrackRefGenome(key);
      }
    });

    setSelectedChr(e.target.chromosome.value);
    setReadsTracks(tracks);
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notifyEl} />
        <Row className="justify-content-md-center">
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-map-big text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Reference Genome</p>
                      {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{referenceSetName}</CardTitle>
                      )}
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-paper text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">ReadGroupSets/BAMs</p>
                      {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{variantSet}</CardTitle>
                      )}
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Form inline onSubmit={formHandler} style={{ justifyContent: 'center' }}>
          { options.length > 0
            && (
            <FormGroup>
              <Label for="VariantSetIds">ReadGroupSets</Label>
              <MultiSelect // Width set in CSS
                required
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </FormGroup>
            )}
          <FormGroup>
            <Label for="chromosome">Chromosome</Label>
            <Input required type="select" id="chromosome">{ chrSelectBuilder() }</Input>
          </FormGroup>

          {/* Use <a> instead of Button to be Safari-compatible */}
            <a href="#" tabIndex="0" id="PopoverFocus" > {/* eslint-disable-line */}
              <Button color="info" style={{ marginRight: '10px', marginTop: '10px' }}>HELP</Button>
            </a>
          <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
            <PopoverHeader>IGV Browser for BAM files</PopoverHeader>
            <PopoverBody>
              <p>
                First, select ReadGroupSets of interest in the leftmost dropdown.
                We recommend no more than three ReadGroupSets at one time.
              </p>
              <p>
                <span role="img" aria-label="warning"> 🛑 </span>
                <b>You must select the chromosome here (left to this button).</b>
                {' '}
                If you wish to view data on different chromosomes,
                {' '}
                <b>
                  you must also change it here, and click on
                  the OPEN BROWSER again.
                </b>
                {' '}
                Do NOT change chromosome in IGV browser.
              </p>
              <p>One ReadGroupSet is usually linked to a BAM or CRAM file.</p>
              <p>The visibility window is 1,000 bps.</p>
            </PopoverBody>
          </UncontrolledPopover>

          <Button>Open Browser</Button>
        </Form>

        <BamInstance
          tracks={readsTracks}
          genome={igvTrackRefGenome}
          chromosome={selectedChr}
          datasetId={datasetId}
        />
      </div>
    </>
  );
}

export default BamBrowser;
