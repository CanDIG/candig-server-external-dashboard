import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

/**
 * SearchIndicator component
 * This loading indicator is used in search.
 */
export const SearchIndicator = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({ area });
  return (
    promiseInProgress && (
    <div
      style={{
        width: '100%',
        height: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader type="Oval" color="#2BAD60" height="60" width="60" />
    </div>
    )
  );
};

SearchIndicator.propTypes = {
  area: PropTypes.string,
};

SearchIndicator.defaultProps = {
  area: 'area',
};

export default SearchIndicator;

export { trackPromise, usePromiseTracker };
