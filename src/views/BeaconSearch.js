import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Form, FormText, FormGroup, Label, Input, Row, UncontrolledPopover, PopoverHeader, PopoverBody,
} from 'reactstrap';
import {
  searchBeaconFreq, searchBeaconRange,
} from '../api/api';
import BeaconTable from '../components/Tables/BeaconTable';

import { notify, NotificationAlert } from '../utils/alert';

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
  const requestModeFunc = { range: searchBeaconRange, freq: searchBeaconFreq };
  const notifyEl = useRef(null);

  useEffect(() => {
    // Hide BeaconTable when datasetId changes
    setDisplayBeaconTable(false);
  }, [datasetId]);

  // Build the dropdown for referenceName
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

  function processFreqVariantsResults(records) {
    const processedRecords = records;
    for (let i = 0; i < processedRecords.length; i += 1) {
      processedRecords[i].AF = JSON.stringify(records[i].AF);
    }
    return records;
  }

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission
    const mode = e.target.requestMode.value;
    const start = e.target.start.value;
    const end = e.target.end.value;

    // validate form input
    if ((Number(end) - Number(start)) > 5000) {
      notify(
        notifyEl,
        'The maximum range you could search for is 5000 bps.',
        'warning',
      );
      setDisplayBeaconTable(false);
      return; // prevent the code below from running
    }

    setDisplayBeaconTable(false);
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
