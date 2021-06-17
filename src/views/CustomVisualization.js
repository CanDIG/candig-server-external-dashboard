import React from 'react';
// reactstrap components
import { Row, Col, Container } from 'reactstrap';

import { useSelector } from 'react-redux';
import CustomVisualizationDropDown from '../components/Dropdowns/CustomVisualizationDropDown';

/*
 * Custom visualization view component
 * @param {string} datasetId
 * @param {string} datasetName
 */
function CustomVisualization() {
  const events = useSelector((state) => state);
  const { datasetName } = events.setData.update;
  const { datasetId } = events.setData.update;
  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col sm="12" xs="12" md="12" lg="6" xl="6">
              <CustomVisualizationDropDown
                datasetId={datasetId}
                datasetName={datasetName}
              />
            </Col>
            <Col sm="12" xs="12" md="12" lg="6" xl="6">
              <CustomVisualizationDropDown
                datasetId={datasetId}
                datasetName={datasetName}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CustomVisualization;
