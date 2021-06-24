/*
 * All the constants should go on this file
 */

// API URL where the Dashboard get all the data
const BASE_URL = process.env.REACT_APP_CANDIG_SERVER_DASHBOARD_BASE_URL;

export const CLIN_METADATA = [
  'celltransplants',
  'chemotherapies',
  'complications',
  'consents',
  'diagnoses',
  'enrollments',
  'immunotherapies',
  'labtests',
  'outcomes',
  'patients',
  'radiotherapies',
  'samples',
  'slides',
  'studies',
  'surgeries',
  'treatments',
  'tumourboards',
];

// Highcharts Map requires a specific set of codes for provinces
// and territories, as represented by hcProvCodes below.
export const hcProvCodes = [
  'ca-ab', 'ca-bc', 'ca-mb', 'ca-nb', 'ca-nl', 'ca-nt', 'ca-ns',
  'ca-nu', 'ca-on', 'ca-pe', 'ca-qc', 'ca-sk', 'ca-yt'];

export const provShortCodes = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
export const provFullNames = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
  'Quebec', 'Saskatchewan', 'Yukon Territory'];

// Intial Highcharts state
export const highchartsMapInitialState = {
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },
  colorAxis: {
    min: 0,
    minColor: '#E6E7E8',
    maxColor: '#005645',
  },
  chart: {
    reflow: true,
  },
  yAxis: {
    min: -10000,
  },
  xAxis: {
    max: 10000,
    min: -1000,
  },
};

// List of referenceNames

export const ListOfReferenceNames = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
  '17', '18', '19', '20', '21', '22', 'X', 'Y', 'MT',
  'chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16',
  'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY', 'chrMT',
];

export const BeaconFreqTableColumnDefs = [
  { headerName: 'Chromosome', field: 'referenceName' },
  {
    headerName: 'Position',
    field: 'start',
    cellRenderer(param) {
      return parseInt(param.data.start, 10) + 1;
    },
  },
  { headerName: 'Reference Allele', field: 'referenceBases' },
  {
    headerName: 'Alternate Alleles',
    field: 'alternateBases',
    cellRenderer(param) {
      let alternateBaseRow = '';
      (param.data.alternateBases).forEach((alternateBase) => { alternateBaseRow += `${alternateBase}<br/>`; });
      return alternateBaseRow;
    },
  },
  {
    headerName: 'Allele Frequency',
    field: 'AF',
    cellRenderer(param) {
      let alleleRow = '';
      ((param.data.AF).substr(1, param.data.AF.length - 2)).split(',').forEach((allele) => { alleleRow += `${allele}<br/>`; });
      return alleleRow;
    },
  },
];

export const BeaconRangeTableColumnDefs = [
  { headerName: 'Chromosome', field: 'referenceName' },
  {
    headerName: 'Position',
    field: 'start',
    cellRenderer(param) {
      return parseInt(param.data.start, 10) + 1;
    },
  },
  { headerName: 'Reference Allele', field: 'referenceBases' },
  { headerName: 'Exists', field: 'exists' },
];

export default BASE_URL;
