import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from 'reactstrap';

function Services() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Service Status</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Service</th>
                      <th>Service URL</th>
                      <th>Status</th>
                      <th className="text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Federation Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:37201</td>
                      <td><i className="nc-icon nc-simple-remove" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>Datasets Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:37203</td>
                      <td><i className="nc-icon nc-simple-remove" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>CHORD Metadata Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:20931</td>
                      <td><i className="nc-icon nc-simple-remove" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>GWAS Hosting Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:24545</td>
                      <td><i className="nc-icon nc-simple-remove" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                    <tr>
                      <td>Htsget Service</td>
                      <td>http://ga4ghdev01.bcgsc.ca:53223</td>
                      <td><i className="nc-icon nc-simple-remove" /></td>
                      <td className="text-right">Just now</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Services;
