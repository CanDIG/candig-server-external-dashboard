import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Card, CardBody, CardTitle, Row, Col, UncontrolledPopover, PopoverHeader, PopoverBody,
} from 'reactstrap';

import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import BASE_URL, {referenceToIgvTrack} from '../constants/constants';

import VcfInstance from '../components/IGV/VcfInstance';
import {
  searchVariantSets, getReferenceSet
} from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import LoadingIndicator, {
  usePromiseTracker,
  trackPromise,
} from '../components/LoadingIndicator/LoadingIndicator';

import '../assets/css/VariantsSearch.css';

function VcfBrowser() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const notifyEl = useRef(null);
  const [variantSet, setVariantSets] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const { promiseInProgress } = usePromiseTracker();
  const [options] = useState([]);
  const [selected, setSelected] = useState([]);
  const [variantsTracks, setVariantsTracks] = useState([]);
  const [igvTrackRefGenome, setIgvTrackRefGenome] = useState('');

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

  useEffect(() => {
    setSelected([]);
    setVariantsTracks([]);
    options.length = 0;

    // Check for variant and reference name set on datasetId changes
    trackPromise(
      searchVariantSets(datasetId).then((data) => {
        setVariantSets(data.results.total);
        setSelected([]);
        options.length = 0;
        data.results.variantSets.forEach((variant) => {
          options.push({ label: variant.name, value: variant.id });
        });
        setSelected(options);
        settingReferenceSetName(data.results.variantSets[0].referenceSetId);
      }).catch(() => {
        setVariantSets('Not Available');
        setReferenceSetName('Not Available');

        // Do not show error message when datasetId is empty
        if (datasetId !== "") {
          notify(
            notifyEl,
            'No VariantSets are available.',
            'warning',
          );
        }
      }),
    );
  }, [datasetId, options]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    let tracks = [];

    if (selected) {
        selected.forEach((variantSetId) => {

            let igv_variant_object = {
                sourceType: "ga4gh",
                type: "variant",
                url: BASE_URL,
                referenceName: "",
                variantSetId: variantSetId.value,
                name: variantSetId.label,
                pageSize: 10000,
                visibilityWindow: 1000000
            };

        tracks.push(igv_variant_object);
      });
    }

    // Determine the reference genome for IGV based on the name of referenceSet
    for (const ref in referenceToIgvTrack) {
      if (referenceToIgvTrack[ref].includes(referenceSetName.toLowerCase())) {
        setIgvTrackRefGenome(ref);
      }
    }

    setVariantsTracks(tracks);
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
                      <p className="card-category">VariantSets/VCFs</p>
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
              <Label for="VariantSetIds">VariantSets</Label>
              <MultiSelect // Width set in CSS
                required
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </FormGroup>
            )}

            {/* Use <a> instead of Button to be Safari-compatible */}
            <a href="#" tabIndex="0" id="PopoverFocus" > {/* eslint-disable-line */}
              <Button color="info" style={{ marginRight: '10px', marginTop: '10px' }}>HELP</Button>
            </a>
            <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
              <PopoverHeader>IGV Browser for VCF files</PopoverHeader>
              <PopoverBody>
                <p>
                  First, select VariantSets/VCFs of interest in the leftmost dropdown.
                  We recommend <b>no more than 5</b> VariantSets at one time.
                </p>
                <p>
                  To view data on desired location, input location in the text field left
                  to the <span role="img" aria-label='magnifying glass'>🔍</span> in IGV Browser, and click 'Enter'. 
                  For example, to go to pos 20000 to 22000 on chr2, input 'chr2:20000-22000'.
                </p>
                <p>You may also double click on desired location to zoom in.</p>
                <p>The visibility window is 1,000,000 bps.</p>
              </PopoverBody>
            </UncontrolledPopover>

          <Button>Open Browser</Button>
        </Form>

        <VcfInstance 
            tracks={variantsTracks}
            genome={igvTrackRefGenome}
            datasetId={datasetId}
        />
      </div>
    </>
  );
}

export default VcfBrowser;
