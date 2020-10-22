import BASE_URL, { CHORD_METADATA_URL } from '../constants/constants';

/*
Fetch individuals from CHORD Metadata service and returns a promise
*/
function fetchIndividuals() {
  return fetch(`${CHORD_METADATA_URL}/api/individuals?page_size=10000`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

/*
Fetch patients from CanDIG web api and returns a promise
*/
function fetchPatients(datasetId) {
  return fetch(`${BASE_URL}/patients/search`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      datasetId,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

/*
Fetch datasets from CanDIG web api datasets endpoint and returns a promise
*/
function fetchDatasets() {
  return fetch(`${BASE_URL}/datasets/search`, {
    method: 'post',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

/*
Fetch servers from CanDIG web api datasets endpoint and returns a promise
*/
function fetchServers() {
  return fetchDatasets();
}

/*
Fetch counter for a specific Dataset Id; table; and field; and returns a promise
 * @param {string}... Dataset ID
 * @param {string}... Table to be fetched from
 * @param {list}... Field to be fetched from
*/
function getCounts(datasetId, table, field) {
  let temp;
  if (!Array.isArray(field)) {
    temp = [field];
  } else {
    temp = field;
  }

  return fetch(`${BASE_URL}/count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dataset_id: datasetId,
      logic: {
        id: 'A',
      },
      components: [
        {
          id: 'A',
          patients: {},
        },
      ],
      results: [
        {
          table,
          fields: temp,
        },
      ],
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

/*
Fetch variant for a specific Dataset Id; start; and reference name; and returns a promise
 * @param {string}... Dataset ID
 * @param {number}... Start
 * @param {number}... End
 * @param {string}... Reference name
*/
function searchVariant(datasetId, start, end, referenceName) {
  return fetch(`${BASE_URL}/variants/search`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start,
      end,
      referenceName,
      datasetId,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

export {
  fetchPatients,
  fetchIndividuals,
  fetchDatasets,
  getCounts,
  fetchServers,
  searchVariant,
};
