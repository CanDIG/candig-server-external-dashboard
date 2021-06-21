import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Card, CardBody, CardTitle, Row, Col, Button, Form, FormText, FormGroup, Label, Input, UncontrolledPopover, PopoverHeader, PopoverBody,
} from 'reactstrap';
import {
  searchBeaconFreq, searchBeaconRange, searchVariantSets, searchReferenceSets,
} from '../api/api';
import BeaconTable from '../components/Tables/BeaconTable';

import { notify, NotificationAlert } from '../utils/alert';
import LoadingIndicator, {
  usePromiseTracker,
} from '../components/LoadingIndicator/LoadingIndicator';

// Consts
import { BeaconFreqTableColumnDefs, BeaconRangeTableColumnDefs, ListOfReferenceNames } from '../constants/constants';

import '../assets/css/VariantsSearch.css';

function BeaconSearch() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [activeColumnDefs, setActiveColumnDefs] = useState([]);
  const [loadingIndicator, setLoadingIndicator] = useState('');
  const [displayBeaconTable, setDisplayBeaconTable] = useState(false);
  const [variantSet, setVariantSets] = useState('');
  const [referenceSetId, setReferenceSetId] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const requestModeFunc = { range: searchBeaconRange, freq: searchBeaconFreq };
  const notifyEl = useRef(null);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    // Hide BeaconTable when datasetId changes
    setDisplayBeaconTable(false);
  
    console.log(datasetId);
    searchVariantSets(datasetId).then((data) => {
      setVariantSets(data.results.total);
      setReferenceSetId(data.results.variantSets[0].referenceSetId);
      console.log(data.results.variantSets[0].referenceSetId);
    }).catch(() => {
      setVariantSets("Not Available");
      setReferenceSetId("Not Available");
      notify(
        notifyEl,
        'No variants sets were found.',
        'warning'
      );
    });
  }, [datasetId]);

  useEffect(() => { 
    searchReferenceSets(referenceSetId).then((data) => {
      setReferenceSetName(data.results.referenceSets[0].name);
      console.log(data.results.referenceSets[0].name);
    }).catch(() => {
      setReferenceSetName("Not Available");
      notify(
        notifyEl,
        'No reference sets were found.',
        'warning'
      );
      })
  }, [referenceSetId]);

  /*
  Build the dropdown for referenceName
  * @param {None}
  * Return a list of options with referenceNames
  */
  function refNameSelectBuilder() {
    const refNameList = [];

    for (let i = 0; i < ListOfReferenceNames.length; i += 1) {
      refNameList.push(
        <option
          key={ListOfReferenceNames[i]}
          value={ListOfReferenceNames[i]}
        >
          {ListOfReferenceNames[i]}
        </option>,
      );
    }
    return refNameList;
  }

  /*
  Stringify the Allele Freq object to be displayed in ag-grid table.
  * @param {array}... records
  * Return a list of records with stringified Allele Freq object
  */
  function processFreqVariantsResults(records) {
    const processedRecords = records;
    for (let i = 0; i < processedRecords.length; i += 1) {
      processedRecords[i].AF = JSON.stringify(records[i].AF);
    }
    return records;
  }

  /*
  Hide table and throw warning if the search range is > 5000.
  * @param {string}... start
  * @param {string}... end
  * Return false if the range is > 5000, true otherwise.
  */
  function validateForm(start, end) {
    if ((Number(end) - Number(start)) > 5000) {
      notify(
        notifyEl,
        'The maximum range you could search for is 5000 bps.',
        'warning',
      );
      setDisplayBeaconTable(false);
      return false;
    }

    return true;
  }

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    const mode = e.target.requestMode.value;
    const start = e.target.start.value;
    const end = e.target.end.value;

    if (validateForm(start, end) === false) {
      return; // prevent the code below from running
    }

    setLoadingIndicator('🕛  Loading...');

    requestModeFunc[mode](datasetId, start, end, e.target.referenceName.value)
      .then((data) => {
        setLoadingIndicator('');
        if (data.results.variants.length !== 0) {
          if (mode === 'freq') {
            setActiveColumnDefs(BeaconFreqTableColumnDefs);
            setRowData(processFreqVariantsResults(data.results.variants));
          } else if (mode === 'range') {
            setActiveColumnDefs(BeaconRangeTableColumnDefs);
            setRowData(data.results.variants);
          }
          setDisplayBeaconTable(true);
        } else {
          setDisplayBeaconTable(false);
          notify(
            notifyEl,
            'No variants were found.',
            'warning',
          );
        }
      }).catch(() => {
        setDisplayBeaconTable(false);
        setLoadingIndicator('');
        setRowData([]);
        notify(
          notifyEl,
          'No variants were found.',
          'warning',
        );
      });
  };



  return (
    <>
      <div className="content">
        <NotificationAlert ref={notifyEl} />
        <Row>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-world-2 text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">VariantSets</p>
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
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">ReferenceSet</p>
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
        </Row>
        <Form onSubmit={formHandler} style={{ justifyContent: 'center' }}>

          <Row style={{ justifyContent: 'center' }}>
            <FormGroup>
              <Label for="start" style={{ float: 'left' }}>Start</Label>
              <Input required type="number" id="start" min="0" />
              <FormText className="text-muted">
                Min value is 0.
              </FormText>
            </FormGroup>

            <FormGroup>
              <Label for="end">End</Label>
              <Input required type="number" id="end" />
              <FormText className="text-muted">
                Max search range is 5000.
              </FormText>
            </FormGroup>

            <FormGroup>
              <Label for="referenceName">Reference Name</Label>
              <Input required type="select" id="referenceName">{ refNameSelectBuilder() }</Input>
            </FormGroup>
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            <FormGroup>
              <Label for="requestMode">Mode</Label>
              <Input required type="select" id="requestMode">
                {
                    [
                      <option key="range" value="range">Range Search</option>,
                      <option key="freq" value="freq">Allele Frequency Search</option>,
                    ]
                  }
              </Input>
            </FormGroup>

            <Button color="info" id="PopoverFocus" type="Button" style={{ marginRight: '10px', marginTop: '30px' }}>
              HELP
            </Button>
            <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
              <PopoverHeader>Beacon Search</PopoverHeader>
              <PopoverBody>
                <p>
                  <b>Note: </b>
                  Coordinates are 0-based.
                </p>
                <p>
                  <b>Range search mode</b>
                  {' '}
                  returns variants above reporting threshold, if available.
                </p>
                <p>
                  <b>Allele Frequency mode</b>
                  {' '}
                  returns allele frequency info of variants, if available.
                </p>
                <p>Each search is limited to 5,000 bps.</p>

              </PopoverBody>
            </UncontrolledPopover>

            <Button style={{ marginTop: '30px' }}>Search</Button>
          </Row>

        </Form>

        <Row style={{ marginTop: '50px' }}>
          <div className="ml-auto mr-auto">
            {loadingIndicator}
          </div>
        </Row>

        {displayBeaconTable ? <BeaconTable columnDefs={activeColumnDefs} rowData={rowData} datasetId={datasetId} /> : null }

      </div>
    </>
  );
}

export default BeaconSearch;
