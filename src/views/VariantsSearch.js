import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector } from 'react-redux';

import VariantsTable from '../components/Tables/VariantsTable';
import { searchVariant, searchVariantSets, getReferenceSet } from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import LoadingIndicator, {
  usePromiseTracker,
  trackPromise,
} from '../components/LoadingIndicator/LoadingIndicator';

import '../assets/css/VariantsSearch.css';

function VariantsSearch() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [displayVariantsTable, setDisplayVariantsTable] = useState(false);
  const notifyEl = useRef(null);
  const [variantSet, setVariantSets] = useState('');
  const [referenceSetName, setReferenceSetName] = useState('');
  const { promiseInProgress } = usePromiseTracker();

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
    // Check for variant and reference name set on datasetId changes
    trackPromise(
      searchVariantSets(datasetId).then((data) => {
        setVariantSets(data.results.total);
        settingReferenceSetName(data.results.variantSets[0].referenceSetId);
      }).catch(() => {
        setVariantSets('Not Available');
        setReferenceSetName('Not Available');
        // notify(
        //   notifyEl,
        //   'No variants or reference set names were found.',
        //   'warning',
        // );
      }),
    );
  }, [datasetId]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    // searchVariant(datasetId, e.target.start.value, e.target.end.value,)
    searchVariant(datasetId, e.target.start.value, e.target.end.value, e.target.referenceName.value)
      .then((data) => {
        setDisplayVariantsTable(true);
        setRowData(data.results.variants);
      }).catch(() => {
        setRowData([]);
        setDisplayVariantsTable(false);
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
        <Row className="justify-content-md-center">
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
        <Form inline onSubmit={formHandler} style={{ justifyContent: 'center' }}>
          <FormGroup>
            <Label for="start">Start</Label>
            <Input required type="number" id="start" />
          </FormGroup>

          <FormGroup>
            <Label for="end">End</Label>
            <Input required type="number" id="end" />
          </FormGroup>

          <FormGroup>
            <Label for="referenceName">Reference Name</Label>
            <Input required type="text" id="referenceName" />
          </FormGroup>

          <Button>Search</Button>
        </Form>

        {displayVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : null }
      </div>
    </>
  );
}

export default VariantsSearch;
