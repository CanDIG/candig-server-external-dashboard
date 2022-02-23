import React from 'react';
import Loader from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

/**
 * Loading Indicator component
 * This component is used when loading charts.
 */
const LoadingIndicator = () => (
  <div
    style={{
      width: '100%',
      height: '100',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Loader type="Oval" color="#2BAD60" height="60" width="60" />
  </div>
);

export { trackPromise, usePromiseTracker, LoadingIndicator };

export default LoadingIndicator;
