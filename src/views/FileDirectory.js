import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector } from 'react-redux';

import { genomicsFileTypes } from '../constants/constants';
import GenericTable from '../components/Tables/GenericTable';
import {
  searchGenomicSets,
} from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';
import { trackPromise } from '../components/LoadingIndicator/LoadingIndicator';
import { SearchIndicator } from '../components/LoadingIndicator/SearchIndicator';

import '../assets/css/VariantsSearch.css';

function FileDirectory() {
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [rowData, setRowData] = useState([]);
  const [columnDef, setColumnDef] = useState([]);
  const [displayFilesTable, setDisplayFilesTable] = useState(false);
  const [currentTable, setCurrentTable] = useState(genomicsFileTypes[0]);
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

  /**
   * Transform all fields of API response into string.
   * @returns a complete API response with all values being string.
   */
  function dataStringifier(apiResponse) {
    const updatedResponse = [];

    apiResponse.forEach((item) => {
      let temp = {};
      Object.keys(item).forEach((key) => {
        temp = item;
        if (typeof item[key] !== 'string') {
          temp[key] = JSON.stringify(item[key]);
        }
      });
      updatedResponse.push(temp);
    });
    return updatedResponse;
  }

  /*
  Build the dropdown for chromosome
  * @param {None}
  * Return a list of options with chromosome
  */
  function typeSelectBuilder() {
    const fileTypeList = [];

    genomicsFileTypes.forEach((fileType) => {
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
    // Called on the initial page load, or when dataset gets switched.
    const reqType = currentTable;
    const reqPath = currentTable.toLowerCase();
    setDisplayFilesTable(false);

    trackPromise(searchGenomicSets(datasetId, reqPath)
      .then((data) => {
        setDisplayFilesTable(true);
        setColumnDef(columnDefBuilder(data.results[reqType]));
        setNumberOfRecords(data.results[reqType].length);
        setRowData(dataStringifier(data.results[reqType]));
      }).catch(() => {
        setRowData([]);
        setNumberOfRecords(0);
        setDisplayFilesTable(false);

        if (datasetId !== '') {
          notify(
            notifyEl,
            'Sorry, no data was found for your request.',
            'warning',
          );
        }
      }),
    'table');
  }, [datasetId, currentTable]);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    setDisplayFilesTable(false);
    setNumberOfRecords(0);
    const reqType = e.target.fileType.value;
    const reqPath = e.target.fileType.value.toLowerCase();
    setCurrentTable(reqType);

    trackPromise(searchGenomicSets(datasetId, reqPath)
      .then((data) => {
        setDisplayFilesTable(true);
        setNumberOfRecords(data.results[reqType].length);
        setColumnDef(columnDefBuilder(data.results[reqType]));
        setRowData(dataStringifier(data.results[reqType]));
      }).catch(() => {
        setRowData([]);
        setDisplayFilesTable(false);
        notify(
          notifyEl,
          'Sorry, but no files of this type were found.',
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

        {(displayFilesTable ? <GenericTable rowData={rowData} columnDefs={columnDef} datasetId={datasetId} /> : (<SearchIndicator area="table" />))}
      </div>
    </>
  );
}

export default FileDirectory;
