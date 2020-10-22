import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// TODO: Importing from igv.esm.min.js is not working
import igv from 'igv/dist/igv.esm';
import { notify, NotificationAlert } from '../../utils/alert';
import VariantsTable from '../Tables/VariantsTable';
import BASE_URL from '../../constants/constants';

function GwasInstance({ selectedGwasName, selectedGwasUrl, datasetId }) {
  /** *
   * A functional component that returns an IGV.js instance dedicated to rendering GWAS data.
   */
  const igvBrowser = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [displayVariantsTable, setDisplayVariantsTable] = useState(false);
  const notifyEl = useRef(null);

  useEffect(() => {
    const igvOptions = {
      genome: 'hg38',
      tracks: [
        {
          type: 'gwas',
          format: 'gwas',
          name: '',
          url: '',
          indexed: false,
          height: 300,
          columns: {
            chromosome: 1,
            position: 2,
            value: 5,
          },
          dotSize: 2.2,
        },
      ],
    };
    igv.removeAllBrowsers(); // Remove existing browser instances

    // Do not create new browser instance on page load as no sample is selected.
    if (selectedGwasName !== '') {
      igvOptions.tracks[0].name = selectedGwasName;
      igvOptions.tracks[0].url = selectedGwasUrl;

      igv.createBrowser(igvBrowser.current, igvOptions).then((browser) => {
        browser.on('trackclick', (track, popoverData) => {
          if (popoverData.length !== 0) {
            fetch(`${BASE_URL}/variants/search`, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                // GWAS is 1-based, while candig-server uses 0-based indexing, thus - 1
                start: String(Number(popoverData[1].value) - 1),
                end: String(Number(popoverData[1].value) + popoverData[2].value.length - 1),
                referenceName: popoverData[0].value,
                datasetId,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setDisplayVariantsTable(true);
                setRowData(data.results.variants);
              }).catch(() => {
                setDisplayVariantsTable(false);
                setRowData([]);
                notify(
                  notifyEl,
                  'No variants were found.',
                  'warning',
                );
              });
          }
        });
      });
    }
  }, [selectedGwasName, selectedGwasUrl, datasetId]);

  return (
    <>
      <NotificationAlert ref={notifyEl} />

      <div
        className="ml-auto mr-auto"
        style={{ background: 'white', marginTop: '15px' }}
        ref={igvBrowser}
      />

      {displayVariantsTable ? <VariantsTable rowData={rowData} datasetId={datasetId} /> : null }
    </>
  );
}

GwasInstance.propTypes = {
  selectedGwasName: PropTypes.string.isRequired,
  selectedGwasUrl: PropTypes.string.isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default GwasInstance;
