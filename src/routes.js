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
import Services from './views/Services';
import APIInfo from './views/APIInfo';
import CustomVisualization from './views/CustomVisualization';
import PatientsOverview from './views/PatientsOverview';
import GwasBrowser from './views/GwasBrowser';
import TableList from "./views/MetadataTableApp";
import ChordTable from "./views/ChordTableApp"
import IndividualsOverview from "./views/IndividualsOverview";
import VariantsSearch from './views/VariantsSearch';

const routes = [
  {
    path: '/overview',
    name: 'Overview',
    icon: 'nc-icon nc-bank',
    component: Overview,
    layout: '/dashboard',
  },
  {
    path: '/patients-overview',
    name: 'Patients Overview',
    icon: 'nc-icon nc-single-02',
    component: PatientsOverview,
    layout: '/dashboard',
  },
  {
    path: '/individuals-overview',
    name: 'Individuals Overview',
    icon: 'nc-icon nc-circle-10',
    component: IndividualsOverview,
    layout: '/dashboard',
  },
  {
    path: '/services',
    name: 'Services status',
    icon: 'nc-icon nc-tv-2',
    component: Services,
    layout: '/dashboard',
  },
  {
    path: '/api_info',
    name: 'API info',
    icon: 'nc-icon nc-sound-wave',
    component: APIInfo,
    layout: '/dashboard',
  },
  {
    path: '/gwas_browser',
    name: 'GWAS Browser',
    icon: 'nc-icon nc-compass-05',
    component: GwasBrowser,
    layout: '/dashboard',
  },
  {
    path: '/variants_search',	
    name: 'Variants Search',	
    icon: 'nc-icon nc-zoom-split',	
    component: VariantsSearch,	
    layout: '/dashboard',	
  },
  {
    path: '/custom_visualization',
    name: 'Custom Visualization',
    icon: 'nc-icon nc-chart-pie-36',
    component: CustomVisualization,
    layout: '/dashboard',
  },
  {
    path: "/tables",
    name: "Clinical Metadata",
    icon: "nc-icon nc-single-copy-04",
    component: TableList,
    layout: "/dashboard",
  },
  {
    path: "/Chord",
    name: "Chord Metadata",
    icon: "nc-icon nc-tile-56",
    component: ChordTable,
    layout: "/dashboard",
  },
];
export default routes;
