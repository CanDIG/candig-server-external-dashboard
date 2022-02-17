import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// TODO: Importing from igv.esm.min.js is not working
import igv from 'igv/dist/igv.esm';

function VcfInstance({ tracks, genome, datasetId }) {
  /** *
   * A functional component that returns an IGV.js instance dedicated to rendering VCF files.
   */
  const igvBrowser = useRef(null);

  useEffect(() => {
    let igvOptions = {
      genome: genome,
      tracks: [],
    };
    igv.removeAllBrowsers(); // Remove existing browser instances

    // Do not create new browser instance on page load as no sample is selected.
    igvOptions.tracks = tracks;

    if (igvOptions.tracks.length > 0) {
        igv.createBrowser(igvBrowser.current, igvOptions).then((browser) => {
            browser.on('trackclick', (track, popoverData) => {
                console.log(popoverData);
            });
        });
    }
    
  }, [tracks, genome, datasetId]);

  return (
    <>
      <div
        className="ml-auto mr-auto"
        style={{ background: 'white', marginTop: '15px' }}
        ref={igvBrowser}
      />

    </>
  );
}

VcfInstance.propTypes = {
  variantsTracks: PropTypes.array.isRequired,
  genome: PropTypes.string.isRequired,
  datasetId: PropTypes.string.isRequired,
};

export default VcfInstance;
