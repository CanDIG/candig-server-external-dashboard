import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { NotificationAlert } from '../../utils/alert';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../assets/css/VariantsSearch.css';

function BeaconTable({ columnDefs, rowData, datasetId }) {
  const notifyEl = useRef(null);

  let gridOptions = {};

  gridOptions = {
    defaultColDef: {
      editable: false,
      sortable: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      filter: true,
      flex: 1,
    },
    rowSelection: 'single',
    rowData: null,
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    paginationAutoPageSize: true,
    pagination: true,
  };

  return (
    <>
      <NotificationAlert ref={notifyEl} />
      <div className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          gridOptions={gridOptions}
          context={{ datasetId }}
        />
      </div>

      <br />
    </>
  );
}

BeaconTable.propTypes = {
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default BeaconTable;
