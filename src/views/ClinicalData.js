import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector } from 'react-redux';

import { CLIN_METADATA } from '../constants/constants';
import GenericTable from '../components/Tables/GenericTable';
import {
  searchGenomicSets,
} from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import { trackPromise } from '../components/LoadingIndicator/LoadingIndicator';
import { SearchIndicator } from '../components/LoadingIndicator/SearchIndicator';

import '../assets/css/VariantsSearch.css';

function ClinicalData() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [columnDef, setColumnDef] = useState([]);
  const [displayClinicalTable, setDisplayClinicalTable] = useState(false);
  const [currentTable, setCurrentTable] = useState(CLIN_METADATA[0]);
  const [numberOfRecords, setNumberOfRecords] = useState(0);
  const notifyEl = useRef(null);

  /** *
   * Build the column definition dynamically.
   * @param {array} apiResponse - The data to be displayed in the table.
   */
  function columnDefBuilder(apiResponse) {
    const fields = Object.keys(apiResponse[0]);
    const columnDefs = [];

    fields.forEach((field) => {
      columnDefs.push({
        headerName: field,
        field,
      });
    });

    return columnDefs;
  }

  /*
  Build the dropdown for chromosome
  * @param {None}
  * Return a list of options with chromosome
  */
  function typeSelectBuilder() {
    const fileTypeList = [];

    CLIN_METADATA.forEach((fileType) => {
      fileTypeList.push(
        <option
          key={fileType}
          value={fileType}
        >
          {fileType}
        </option>,
      );
    });
    return fileTypeList;
  }

  useEffect(() => {
    // only called on the initial page load.
    const reqType = CLIN_METADATA[0];
    const reqPath = CLIN_METADATA[0].toLowerCase();

    trackPromise(searchGenomicSets(datasetId, reqPath)
      .then((data) => {
        setDisplayClinicalTable(true);
        setNumberOfRecords(data.results[reqType].length);
        setColumnDef(columnDefBuilder(data.results[reqType]));
        setRowData(data.results[reqType]);
      }).catch(() => {
        setRowData([]);
        setDisplayClinicalTable(false);
      }),
    'table');
  }, [datasetId]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    setDisplayClinicalTable(false);
    setNumberOfRecords(0);
    const reqType = e.target.fileType.value;
    const reqPath = e.target.fileType.value.toLowerCase();
    setCurrentTable(reqType);

    trackPromise(searchGenomicSets(datasetId, reqPath)
      .then((data) => {
        setDisplayClinicalTable(true);
        setNumberOfRecords(data.results[reqType].length);
        setColumnDef(columnDefBuilder(data.results[reqType]));
        setRowData(data.results[reqType]);
      }).catch(() => {
        setRowData([]);
        setDisplayClinicalTable(false);
        notify(
          notifyEl,
          'Sorry, but no reads were found in your search range.',
          'warning',
        );
      }),
    'table');
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
                      <p className="card-category">Currently Displaying</p>
                      <CardTitle tag="p">{currentTable}</CardTitle>
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
                      <p className="card-category">Number of Records</p>
                      <CardTitle tag="p">{numberOfRecords}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Form inline onSubmit={formHandler} style={{ justifyContent: 'center', marginBottom: '20px' }}>
          <FormGroup>
            <Label for="fileType">Type</Label>
            <Input required type="select" id="fileType">{ typeSelectBuilder() }</Input>
          </FormGroup>
          <Button>View</Button>
        </Form>

        {(displayClinicalTable ? <GenericTable rowData={rowData} columnDefs={columnDef} datasetId={datasetId} /> : (<SearchIndicator area="table" />))}
      </div>
    </>
  );
}

export default ClinicalData;
