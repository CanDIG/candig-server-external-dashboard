import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../assets/css/VariantsSearch.css';

function ReadsTable({ rowData, datasetId }) {
  let gridOptions = {};

  function getColumnDefs() {
    const columnDefs = [
      { headerName: 'Aligned Sequence', field: 'alignedSequence' },
      { headerName: 'Fragment Name', field: 'fragmentName' },
      { headerName: 'Number Reads', field: 'numberReads' },
      { headerName: 'Fragment Length', field: 'fragmentLength' },
      { headerName: 'Read Number', field: 'readNumber' },
      { headerName: 'Improper Placement', field: 'improperPlacement' },
    ];

    return columnDefs;
  }

  gridOptions = {
    defaultColDef: {
      editable: false,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      minHeight: 300,
    },
    rowSelection: 'single',
    rowData: null,
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    paginationAutoPageSize: true,
    pagination: true,
    valueCache: true,
  };

  return (
    <>
      <div className="ag-theme-alpine">
        <AgGridReact
          columnDefs={getColumnDefs()}
          rowData={rowData}
          gridOptions={gridOptions}
          context={{ datasetId }}
        />
      </div>

      <br />
    </>
  );
}

ReadsTable.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default ReadsTable;
