import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';

import VariantsTable from '../components/Tables/VariantsTable';
import {
  searchVariant, searchVariantSets, searchVariantByVariantSetIds, getReferenceSet,
} from '../api/api';
import { ListOfReferenceNames } from '../constants/constants';

import { notify, NotificationAlert } from '../utils/alert';
import { LoadingIndicator, usePromiseTracker, trackPromise } from '../components/LoadingIndicator/LoadingIndicator';
import { SearchIndicator } from '../components/LoadingIndicator/SearchIndicator';

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
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [variantSetIds, setVariantSetIds] = useState([]);

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
    // Check for variant and reference name set on datasetId changes
    trackPromise(
      searchVariantSets(datasetId).then((data) => {
        setVariantSets(data.results.total);
        setSelected([]);
        const dropdownOptions = [];
        dropdownOptions.length = 0;
        data.results.variantSets.forEach((variant) => {
          dropdownOptions.push({ label: variant.name, value: variant.id });
        });
        setOptions(dropdownOptions);
        setSelected(dropdownOptions);
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

    if (selected) {
      selected.forEach((variantSetId) => {
        variantSetIds.push(variantSetId.value);
      });
      // searchVariant(e.target.start.value, e.target.end.value, e.target.chromosome.value, variantSetIds) query /variants/search
      trackPromise(searchVariantByVariantSetIds(e.target.start.value, e.target.end.value, e.target.chromosome.value, variantSetIds)
        .then((data) => {
          setDisplayVariantsTable(true);
          setRowData(data.results.variants);
        }).catch(() => {
          setRowData([]);
          setDisplayVariantsTable(false);
          //           notify(
          //             notifyEl,
          //             'No variants were found.',
          //             'warning',
          //           );
        }),
      'table');
      setVariantSetIds([]);
    } else {
      searchVariant(datasetId, e.target.start.value, e.target.end.value, e.target.chromosome.value).then((data) => {
        setRowData(data.results.variants);
        setDisplayVariantsTable(true);
      }).catch(() => {
        setDisplayVariantsTable(false);
        notify(
          notifyEl,
          'No variants were found.',
          'warning',
        );
      });
    }
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
              <Label for="VariantSetIds">Variant Set</Label>
              <MultiSelect // Width set in CSS
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

        {displayVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : (<SearchIndicator area="table" />) }
      </div>
    </>
  );
}

export default VariantsSearch;
