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

export default BASE_URL;
