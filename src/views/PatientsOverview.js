import React, { useState, useEffect, useRef } from 'react';

// reactstrap components
import {
  Card, CardBody, CardTitle, Row, Col,
} from 'reactstrap';
import useStateWithCallback from 'use-state-with-callback';

import { useSelector } from 'react-redux';
import LoadingIndicator, {
  trackPromise,
  usePromiseTracker,
} from '../components/LoadingIndicator/LoadingIndicator';
import { groupBy } from '../utils/utils';
import { notify, NotificationAlert } from '../utils/alert';
import CustomOfflineChart from '../components/Graphs/CustomOfflineChart';
import { fetchPatients } from '../api/api';
import PatientsDistributionByProvinceMapChart from '../components/Maps/PatientsDistributionByProvince';

/*
 * Patient Overview view component
 */
function PatientsOverview() {
  const events = useSelector((state) => state);
  const [patientsCount, setPatientsCount] = useState();
  const [provincesCount, setProvincesCount] = useState('');
  const [genderObj, setGenderObj] = useState({});
  const [ethnicityObj, setEthnicityObj] = useState({});
  const [raceObj, setRaceObj] = useState({});
  const [causeOfDeathObj, setCauseOfDeathObj] = useState({});
  const [
    provinceOfResidenceObj,
    setProvinceOfResidenceObj,
  ] = useStateWithCallback({}, () => {
    if (Object.keys(provinceOfResidenceObj).length > 0) {
      setProvincesCount(Object.keys(provinceOfResidenceObj).length);
    }
  });
  const [
    occupationalOrEnvironmentalExposureObj,
    setOccupationalOrEnvironmentalExposureObj,
  ] = useState({});
  const { datasetName, datasetId } = events.setData.update;
  const { promiseInProgress } = usePromiseTracker();
  const notifyEl = useRef(null);

  useEffect(() => {
    if (datasetId) {
      trackPromise(
        fetchPatients(datasetId).then((data) => {
          const patientsList = data.results.patients;
          if (!patientsList) {
            throw new Error();
          }
          setPatientsCount(patientsList.length);
          setGenderObj(groupBy(patientsList, 'gender'));
          setEthnicityObj(groupBy(patientsList, 'ethnicity'));
          setRaceObj(groupBy(patientsList, 'race'));
          setCauseOfDeathObj(groupBy(patientsList, 'causeOfDeath'));
          setProvinceOfResidenceObj(
            groupBy(patientsList, 'provinceOfResidence'),
          );
          setOccupationalOrEnvironmentalExposureObj(
            groupBy(patientsList, 'occupationalOrEnvironmentalExposure'),
          );
        })
          .catch(() => {
            notify(
              notifyEl,
              'The resources you requested were not available.',
              'warning',
            );
          }),
      );
    }
  }, [datasetId, setProvinceOfResidenceObj]);

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
                      <p className="card-category">Provinces</p>
                      {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{provincesCount}</CardTitle>
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
                      <p className="card-category">Patients</p>
                      {promiseInProgress === true ? (
                        <LoadingIndicator />
                      ) : (
                        <CardTitle tag="p">{patientsCount}</CardTitle>
                      )}
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <CustomOfflineChart
                    datasetName={datasetName}
                    dataObject={genderObj}
                    chartType="bar"
                    barTitle="Gender"
                    height="200px; auto"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <CustomOfflineChart
                    datasetName={datasetName}
                    dataObject={ethnicityObj}
                    chartType="bar"
                    barTitle="Ethnicity"
                    height="200px; auto"
                  />
                )}
              </CardBody>
            </Card>
          </Col>

          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <CustomOfflineChart
                    datasetName={datasetName}
                    dataObject={raceObj}
                    chartType="bar"
                    barTitle="Race"
                    height="200px; auto"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <CustomOfflineChart
                    datasetName={datasetName}
                    dataObject={causeOfDeathObj}
                    chartType="bar"
                    barTitle="Cause Of Death"
                    height="200px; auto"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <PatientsDistributionByProvinceMapChart provinceOfResidenceObj={provinceOfResidenceObj} />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12" sm="12">
            <Card>
              <CardBody>
                {promiseInProgress === true ? (
                  <LoadingIndicator />
                ) : (
                  <CustomOfflineChart
                    datasetName={datasetName}
                    dataObject={occupationalOrEnvironmentalExposureObj}
                    chartType="pie"
                    barTitle="Occupational Or Environmental Exposure"
                    height="400px; auto"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PatientsOverview;
