import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDatasets } from '../../api/api';

/*
 * Dropdown component listing all the available Datasets
 * @param{func} A method that updates the state on the parent
 */
function DatasetsDropdown({ updateState }) {
  const events = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedDataset, setSelectedDataset] = useState(events.setData.selectedDataset);
  const [datasets, setDatasets] = useState(events.setData.datasets);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  /*
   * Update the datasetName and datasetId on the parent component
   * @param {string} datasetName
   * @param {string} datasetId
   */
  function updateParentState(datasetName, datasetId) {
    dispatch({ type: 'SET_UPDATE_STATE', payload: { datasetName, datasetId } });
    updateState(events.setData.update);
  }

  /*
   * Set a dataset as a selected one on the dropdown one the list is fetched from the API
   * @param {list} datasetsList
   */
  function setFirstDataset(datasetsList) {
    const firstDataset = datasetsList[Object.keys(datasetsList)[0]];
    setSelectedDataset(firstDataset.name);
    updateParentState(firstDataset.name, firstDataset.id);
    dispatch({ type: 'SET_SELECTED_DATASET', payload: firstDataset.name });
  }

  /*
   * Process the dataset json object from the API
   * @param {list} datasets
   */
  function processDatasetJson(datasetJson) {
    const datasetsList = {};
    datasetJson.forEach((dataset) => {
      datasetsList[dataset.id] = dataset;
    });
    return datasetsList;
  }

  /*
   * Fetch dataset information from the server after the Dropdown component is added to the DOM
   * and update both parent and local state
   */
  useEffect(() => {
    if (!selectedDataset) {
      fetchDatasets()
        .then((data) => {
          const datasetsList = processDatasetJson(data.results.datasets);
          setDatasets(datasetsList);
          setFirstDataset(datasetsList);
          dispatch({ type: 'SET_DATASETS', payload: datasetsList });
        });
    }
  });

  /*
   * Update both parent and local components state
   */
  function handleClick(e) {
    setSelectedDataset(e.currentTarget.textContent);
    updateParentState(e.currentTarget.textContent, e.currentTarget.id);
    dispatch({ type: 'SET_SELECTED_DATASET', payload: e.currentTarget.textContent });
  }

  // This loop builds the dropdown items list
  const datasetList = Object.keys(datasets).map((key) => (
    <DropdownItem
      default
      onClick={handleClick}
      key={key}
      id={key}
    >
      {datasets[key].name}
    </DropdownItem>
  ));

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      style={{
        borderRadius: '25px',
        backgroundColor: '#212120',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <DropdownToggle caret nav style={{ color: 'white' }}>
        {selectedDataset}
      </DropdownToggle>
      <DropdownMenu right>{datasetList}</DropdownMenu>
    </Dropdown>
  );
}

DatasetsDropdown.propTypes = {
  updateState: PropTypes.func.isRequired,
};

export default DatasetsDropdown;
