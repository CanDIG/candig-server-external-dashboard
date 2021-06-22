/* eslint-disable */
import React, {useState} from 'react';
// reactstrap components
import {
  Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';

import Server from './../components/Graphs/Server.js';
import BarChart from './../components/Graphs/BarChart.js';
import CancerType from './../components/Graphs/CancerType.js';
import TreatingCentreProvince from './../components/Maps/TreatingCentreProvince';

import {getCounts} from '../api/api';

/*
 * Overview view component
 */

function Dashboard(){
  const events = useSelector((state) => state);
  const { datasetId } = events.setData.update;
  const [provinces, setProvinces] = useState(0);
  const [hospitals, setHospitals] = useState(0);
  const [patients, setPatients] = useState(0);
  const [samples, setSamples] = useState(0);

  function getEnrollmentsCounters(datasetId, table, fields){
    getCounts(datasetId, table, fields)
      .then((data) => {

        let enrol_obj = data.results.enrollments[0];

        if ('datasetId' in enrol_obj) {
          setPatients(enrol_obj.datasetId[datasetId]);
        }
        else {
          setPatients('Not Available');
        }

        if ('treatingCentreName' in enrol_obj) {
          setHospitals(Object.keys(enrol_obj.treatingCentreName).length);
        }
        else {
          setHospitals('Not Available');
        }

        if ('treatingCentreProvince' in enrol_obj) {
          setProvinces(Object.keys(enrol_obj.treatingCentreProvince).length);
        }
        else {
          setProvinces('Not Available');
        }

      })
      .catch((err) => {
        setProvinces('Not Available');
        setHospitals('Not Available');
        setPatients('Not Available');
      });
  }

  function getSampleCounters(datasetId, table, fields){
    getCounts(datasetId, table, fields)
      .then((data) => {
          setSamples(data.results.samples[0].datasetId[datasetId]);
      })
      .catch((err) => {
        setSamples('Not Available');
      });
  }

  function fetchData(datasetId){
    if (datasetId) {
      getEnrollmentsCounters(datasetId, 'enrollments', [
        'datasetId',
        'treatingCentreName',
        'treatingCentreProvince',
      ]);
      getSampleCounters(datasetId, 'samples', ['datasetId']);
    }
  }
 
  if (events.setData.update.datasetId) {
      fetchData(events.setData.update.datasetId);
  }
  
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
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
                        <p className="card-category">Provinces</p>
                        <CardTitle tag="p">{provinces}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bank text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Hospitals</p>
                        <CardTitle tag="p">{hospitals}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
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
                        <p className="card-category">Patients</p>
                        <CardTitle tag="p">{patients}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Samples</p>
                        <CardTitle tag="p">{samples}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <Server datasetId={datasetId} />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={datasetId}
                    table="patients"
                    field="gender"
                    title="Gender Distribution"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={datasetId}
                    table="treatments"
                    field="therapeuticModality"
                    title="Treatment Modalities"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card>
                <CardBody>
                  <BarChart
                    datasetId={datasetId}
                    table="enrollments"
                    field="enrollmentInstitution"
                    title="Enrollment Institutions"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" sm="6">
              <Card>
                <CardBody>
                  <TreatingCentreProvince datasetId={datasetId} />
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="6" sm="6">
              <Card>
                <CardBody>
                  <CancerType datasetId={datasetId} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

export default Dashboard;
