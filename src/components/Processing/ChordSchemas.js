// Assume data is present at this state

// Need to turn each metadata object into objects easily mapped to tables
// Flatten and assign higher order ID to smaller objects

export function ProcessMetadata(metadata) {
  const mainTable = [];
  const phenopacketsList = {};
  Object.values(metadata).forEach((entry) => {
    const mainTableEntry = {
      ID: entry.id,
      DOB: entry.date_of_birth,
      Sex: entry.sex,
      KSex: entry.karyotypic_sex,
      ethnicity: entry.ethnicity,
      height: entry.extra_properties.height,
      weight: entry.extra_properties.weight,
      education: entry.extra_properties.education,
      taxID: entry.taxonomy.id,
      taxLabel: entry.taxonomy.label,
      created: entry.created,
      updated: entry.updated,

    };
    mainTable.push(mainTableEntry);
    const ID = entry.id;
    const Pheno = entry.phenopackets[0];
    phenopacketsList[ID] = Pheno;
  });

  return [mainTable, phenopacketsList];
}

export function ProcessData(ID, dataList, dataSchema) {
  const processedData = [];
  Object.values(dataList).forEach((data) => {
    const dataEntry = dataSchema(data);
    processedData.push(dataEntry);
  });
  return { [ID]: processedData };
}

export const diseaseSchema = (data) => {
  const entry = {
    ID: data.id,
    term: data.term.id,
    label: data.term.label,
    comorbidities: data.extra_properties.comorbidities_group,
    created: data.created,
    updated: data.updated,
  };
  return entry;
};

export const featureSchema = (data) => {
  const entry = {
    ID: data.type.id,
    label: data.type.label,
    comorbidities: data.extra_properties.comorbidities_group,
    created: data.created,
    updated: data.updated,
  };
  return entry;
};
