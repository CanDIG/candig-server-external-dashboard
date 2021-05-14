import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input, Row, UncontrolledAlert,
} from 'reactstrap';

import { searchVariant } from '../api/api';

import { notify, NotificationAlert } from '../utils/alert';

import '../assets/css/VariantsSearch.css';

function BeaconSearch({ datasetId }) {
  const [beaconResponse, setBeaconResponse] = useState("");
  const notifyEl = useRef(null);

  const formHandler = (e) => {
    e.preventDefault(); // Prevent form submission

    setBeaconResponse("🕛  Loading...")

    // searchVariant(datasetId, e.target.start.value, e.target.end.value,)
    searchVariant(datasetId, e.target.start.value, e.target.end.value, e.target.referenceName.value)
      .then((data) => {
        if (Object.keys(data).length === 0) {
            setBeaconResponse("❌  Variants do not exist for your search.")
        }
        else {
            setBeaconResponse("✅  Variants exist for your search.")
        }
      }).catch(() => {
        notify(
            notifyEl,
            'Something else is wrong.',
            'warning',
          );
      });
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notifyEl} />

        <Row>
          <UncontrolledAlert color="info" className="ml-auto mr-auto alert-with-icon" fade={false}>
            <span
              data-notify="icon"
              className="nc-icon nc-bell-55"
            />

            <b>
              <p> Reminders: </p>
              <p> You will need to supply values for all three fields. </p>
            </b>
          </UncontrolledAlert>
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

        <Row style={{ marginTop: "50px" }}>
            <div className="ml-auto mr-auto"> {beaconResponse} </div>
        </Row>

      </div>
    </>
  );
}

BeaconSearch.propTypes = {
  datasetId: PropTypes.string.isRequired,
};

export default BeaconSearch;
