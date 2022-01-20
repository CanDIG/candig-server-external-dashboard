import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector } from 'react-redux';

import { ListOfReferenceNames } from '../constants/constants';
import VariantsTable from '../components/Tables/VariantsTable';
import {
  searchVariant, searchReadGroupSets, searchReads, getReferenceSet,
} from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import LoadingIndicator, {
  usePromiseTracker,
  trackPromise,
} from '../components/LoadingIndicator/LoadingIndicator';

import '../assets/css/VariantsSearch.css';

function ReadsSearch() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [displayVariantsTable, setDisplayVariantsTable] = useState(false);
  const notifyEl = useRef(null);
  const [readGroupSetCount, setReadGroupSetCount] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const [apiResponse, setApiResponse] = useState({});
  const [bamOptionList, setBamOptionList] = useState([]);
  const { promiseInProgress } = usePromiseTracker();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [readGroupSetIds, setReadGroupSetIds] = useState([]);

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
  Build the dropdown for BAM files
  * @param {None}
  * Return a list of options with BAM files
  */
  function bamSelectBuilder(readGroupSets) {
    let bamOptions = [];

    readGroupSets.forEach((readGroupSet) => {
      bamOptions.push(
        <option
          key={readGroupSet.name}
          value={readGroupSet.id}
        >
          {readGroupSet.name}
        </option>,
      )
    });

    setBamOptionList(bamOptions);
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
      )
    });
    return refNameList;
  }

  useEffect(() => {
    setBamOptionList([]);

    // Check for variant and reference name set on datasetId changes
    trackPromise(
        searchReadGroupSets(datasetId).then((data) => {
        setApiResponse(data);
        setReadGroupSetCount(data.results.total);
        setSelected([]);

        bamSelectBuilder(data.results.readGroupSets);

        // data.results.readGroupSets.forEach((readGroupSet) => {
        //   options.push({ label: readGroupSet.name, value: readGroupSet.id });
        // });
        // setOptions(options);
        // setSelected(options);
        settingReferenceSetName(data.results.readGroupSets[0].readGroups[0].referenceSetId);
      }).catch(() => {
        setReadGroupSetCount('Not Available');
        setReferenceSetName('Not Available');
      }),
    );
  }, [datasetId, options]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    const readGroupSetId = e.target.bam.value;

    let readGroupIds = [];

    apiResponse.results.readGroupSets.forEach((readGroupSet) => {
        if (readGroupSetId === readGroupSet.id) {
            readGroupSet.readGroups.forEach((readGroup) => {
                readGroupIds.push(readGroup.id);
            });
        }
    });

      searchReads(e.target.start.value, e.target.end.value, e.target.chromosome.value, referenceSetName, readGroupIds)
        .then((data) => {
          console.log(data)
        //   setRowData(data.results.variants);
        }).catch(() => {
        //   setRowData([]);
        //   setDisplayVariantsTable(false);
        });
        setReadGroupSetIds([]);
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
                        <CardTitle tag="p">{readGroupSetCount}</CardTitle>
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
          <FormGroup>
              <Label for="bam">BAMs</Label>
              <Input style={{ maxWidth: '200px' }} required type="select" id="bam">{ bamOptionList }</Input>
          </FormGroup>
          <FormGroup>
            <Label for="chromosome">Chromosome</Label>
            <Input required type="select" id="chromosome">{ chrSelectBuilder() }</Input>
          </FormGroup>
          <FormGroup>
            <Label for="start">Start</Label>
            <Input required type="number" id="start" />
          </FormGroup>
          <FormGroup>
            <Label for="end">End</Label>
            <Input required type="number" id="end" />
          </FormGroup>
          <Button>Search</Button>
        </Form>

        {displayVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : null }
      </div>
    </>
  );
}

export default ReadsSearch;
