/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

*/
import Overview from './views/Overview';
import APIInfo from './views/APIInfo';
import CustomVisualization from './views/CustomVisualization';
import PatientsOverview from './views/PatientsOverview';
import TableList from './views/MetadataTableApp';
import VariantsSearch from './views/VariantsSearch';
import BeaconSearch from './views/BeaconSearch';
import Help from './views/Help';


const routes = [
  {
    path: '/overview',
    name: 'Overview',
    icon: 'nc-icon nc-bank',
    component: Overview,
    layout: '/v2/dashboard',
  },
  {
    path: '/patients-overview',
    name: 'Patients Overview',
    icon: 'nc-icon nc-single-02',
    component: PatientsOverview,
    layout: '/v2/dashboard',
  },
  {
    path: '/api-info',
    name: 'API info',
    icon: 'nc-icon nc-sound-wave',
    component: APIInfo,
    layout: '/v2/dashboard',
  },
  {
    path: '/variants-search',
    name: 'Variants Search',
    icon: 'nc-icon nc-zoom-split',
    component: VariantsSearch,
    layout: '/v2/dashboard',
  },
  {
    path: '/beacon-search',
    name: 'Beacon Search',
    icon: 'nc-icon nc-zoom-split',
    component: BeaconSearch,
    layout: '/v2/dashboard',
  },
  {
    path: '/custom-visualization',
    name: 'Custom Visualization',
    icon: 'nc-icon nc-chart-pie-36',
    component: CustomVisualization,
    layout: '/v2/dashboard',
  },
  {
    path: '/clinical-metadata',
    name: 'Clinical Metadata',
    icon: 'nc-icon nc-single-copy-04',
    component: TableList,
    layout: '/v2/dashboard',
  },
  {
    path: '/help',
    name: 'Help',
    icon: 'nc-icon nc-alert-circle-i',
    component: Help,
    layout: '/v2/dashboard',
  },
];
export default routes;
