import React from 'react';

// reactstrap components
import { Card, CardBody } from 'reactstrap';

/*
 * Help component
 */
function Help() {
  return (
    <>
      <div className="content">

        <div className="card-columns">
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">FAQ</h5>
              <h6 className="card-subtitle mb-2 text-muted">Why do some charts not load?</h6>
              <p className="card-text">
                Some of the datasets do not have data for certain fields, and corresponding charts will not load.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">How do I view different datasets?</h6>
              <p className="card-text">
                You may change the selected dataset from the dropdown in the top-right corner.
              </p>
              {/* <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a> */}
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Overview</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">How to do X?</h6>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Patient Overview</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">API Info</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Variants Search</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Beacon Search</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Custom Visualization</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Clinical Metadata</h5>
              <h6 className="card-subtitle mb-2 text-muted">General information</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
            </CardBody>
          </Card>

        </div>

      </div>
    </>
  );
}

export default Help;
