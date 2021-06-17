import React, { useReducer, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import mapDataCanada from '@highcharts/map-collection/countries/ca/ca-all.geo.json';
import PropTypes from 'prop-types';

import LoadingIndicator, { usePromiseTracker } from '../LoadingIndicator/LoadingIndicator';
import { notify, NotificationAlert } from '../../utils/alert';
import {
  hcProvCodes, provShortCodes, provFullNames, highchartsMapInitialState,
} from '../../constants/constants';

// Initialize HighchartsMap
HighchartsMap(Highcharts);

function reducer(state, action) {
  switch (action.type) {
    case 'addSeries':
      return {
        ...state,
        ...{
          title: {
            text: 'Distribution by Province of Residence',
          },
          series: [
            {
              data: action.payload,
              type: 'map',
              name: 'Province',
              mapData: mapDataCanada,
              states: {
                hover: {
                  color: '#BADA55',
                },
              },
              dataLabels: {
                enabled: false,
                format: '{point.name}',
              },
            },
          ],
        },
      };
    default:
      throw new Error();
  }
}

function PatientsDistributionByProvince({ provinceOfResidenceObj }) {
  const { promiseInProgress } = usePromiseTracker();
  const [chartOptions, dispatchChartOptions] = useReducer(reducer, highchartsMapInitialState);
  const notifyEl = useRef(null);

  function processData(data) {
    const dataCount = [];
    Object.keys(data).forEach((name) => {
      if (provShortCodes.includes(name)) {
        const tempDataCount = [];
        tempDataCount.push(hcProvCodes[provShortCodes.indexOf(name)]);
        tempDataCount.push(data[name]);
        dataCount.push(tempDataCount);
      } else if (provFullNames.includes(name)) {
        const tempDataCount = [];
        tempDataCount.push(hcProvCodes[provFullNames.indexOf(name)]);
        tempDataCount.push(data[name]);
        dataCount.push(tempDataCount);
      }
    });

    return dataCount;
  }

  useEffect(() => {
    try {
      const dataCount = processData(provinceOfResidenceObj);
      dispatchChartOptions({ type: 'addSeries', payload: dataCount });
    } catch {
      notify(
        notifyEl,
        'Some resources you requested were not available.',
        'warning',
      );
      dispatchChartOptions({ type: 'addSeries', payload: [] });
    }
  }, [provinceOfResidenceObj]);

  return (
    <>
      <NotificationAlert ref={notifyEl} />
      {promiseInProgress === true ? (
        <LoadingIndicator />
      ) : (
        <div>
          <HighchartsReact
            contructorType="mapChart"
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
      )}
    </>
  );
}

PatientsDistributionByProvince.propTypes = {
  provinceOfResidenceObj: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default PatientsDistributionByProvince;
