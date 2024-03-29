/*
 * This JS Object stores all the tables names and its columns names.
 * This object can be used for visualizations and places where the name of the columns are needed.
 */
const tableSchema = {
  patients: [
    'patientId',
    'dateOfBirth',
    'gender',
    'ethnicity',
    'race',
    'provinceOfResidence',
    'dateOfDeath',
    'causeOfDeath',
    'autopsyTissueForResearch',
    'priorMalignancy',
    'dateOfPriorMalignancy',
    'familyHistoryAndRiskFactors',
    'familyHistoryOfPredispositionSyndrome',
    'detailsOfPredispositionSyndrome',
    'geneticCancerSyndrome',
    'otherGeneticConditionOrSignificantComorbidity',
    'occupationalOrEnvironmentalExposure',
  ],
  enrollments: [
    'enrollmentInstitution',
    'enrollmentApprovalDate',
    'crossEnrollment',
    'otherPersonalizedMedicineStudyName',
    'otherPersonalizedMedicineStudyId',
    'ageAtEnrollment',
    'eligibilityCategory',
    'statusAtEnrollment',
    'primaryOncologistName',
    'primaryOncologistContact',
    'referringPhysicianName',
    'referringPhysicianContact',
    'summaryOfIdRequest',
    'treatingCentreName',
    'treatingCentreProvince',
  ],
  treatments: [
    'courseNumber',
    'therapeuticModality',
    'treatmentPlanType',
    'treatmentIntent',
    'startDate',
    'stopDate',
    'reasonForEndingTheTreatment',
    'responseToTreatment',
    'responseCriteriaUsed',
    'dateOfRecurrenceOrProgressionAfterThisTreatment',
    'unexpectedOrUnusualToxicityDuringTreatment',
  ],
  samples: [
    'sampleId',
    'collectionDate',
    'collectionHospital',
    'sampleType',
    'tissueDiseaseState',
    'anatomicSiteTheSampleObtainedFrom',
    'cancerType',
    'cancerSubtype',
    'pathologyReportId',
    'morphologicalCode',
    'topologicalCode',
    'shippingDate',
    'receivedDate',
    'qualityControlPerformed',
    'estimatedTumorContent',
    'quantity',
    'units',
    'associatedBiobank',
    'otherBiobank',
    'sopFollowed',
    'ifNotExplainAnyDeviation',
  ],
  diagnoses: [
    'diagnosisDate',
    'ageAtDiagnosis',
    'cancerType',
    'classification',
    'cancerSite',
    'histology',
    'methodOfDefinitiveDiagnosis',
    'sampleType',
    'sampleSite',
    'tumorGrade',
    'gradingSystemUsed',
    'sitesOfMetastases',
    'stagingSystem',
    'versionOrEditionOfTheStagingSystem',
    'specificTumorStageAtDiagnosis',
    'prognosticBiomarkers',
    'biomarkerQuantification',
    'additionalMolecularTesting',
    'additionalTestType',
    'laboratoryName',
    'laboratoryAddress',
    'siteOfMetastases',
    'stagingSystemVersion',
    'specificStage',
    'cancerSpecificBiomarkers',
    'additionalMolecularDiagnosticTestingPerformed',
    'additionalTest',
  ],
  tumourboards: [
    'dateOfMolecularTumorBoard',
    'typeOfSampleAnalyzed',
    'typeOfTumourSampleAnalyzed',
    'analysesDiscussed',
    'somaticSampleType',
    'normalExpressionComparator',
    'diseaseExpressionComparator',
    'hasAGermlineVariantBeenIdentifiedByProfilingThatMayPredisposeToCancer',
    'actionableTargetFound',
    'molecularTumorBoardRecommendation',
    'germlineDnaSampleId',
    'tumorDnaSampleId',
    'tumorRnaSampleId',
    'germlineSnvDiscussed',
    'somaticSnvDiscussed',
    'cnvsDiscussed',
    'structuralVariantDiscussed',
    'classificationOfVariants',
    'clinicalValidationProgress',
    'typeOfValidation',
    'agentOrDrugClass',
    'levelOfEvidenceForExpressionTargetAgentMatch',
    'didTreatmentPlanChangeBasedOnProfilingResult',
    'howTreatmentHasAlteredBasedOnProfiling',
    'reasonTreatmentPlanDidNotChangeBasedOnProfiling',
    'detailsOfTreatmentPlanImpact',
    'patientOrFamilyInformedOfGermlineVariant',
    'patientHasBeenReferredToAHereditaryCancerProgramBasedOnThisMolecularProfiling',
    'summaryReport',
    'actionableExpressionOutlier',
    'actionableGermlineVariant',
    'germlineVariantsDrug',
    'germlineVariantsDrugClass',
    'germlineVariantsDiscussed',
    'actionableSomaticVariants',
    'somaticVariantsDrug',
    'somaticVariantsDrugClass',
    'somaticVariantsDiscussed',
    'anyActionableExpressionOutlier',
    'expressionDrug',
    'expressionDrugClass',
    'expressionTypeOfAnalysisUsed',
    'expressionTypeOfInformationUtility',
    'expressionAlteredGene',
    'expressionNonActionableGene',
    'expressionTypeOfAlteration',
    'anyActionableGermlineVariants',
    'germlineVariantsTypeOfAnalysisUsed',
    'germlineVariantsClassificationOfVariants',
    'germlineVariantsTypeOfInformationUtility',
    'anyActionableSomaticVariants',
    'somaticVariantsTypeOfAnalysisUsed',
    'somaticVariantsTypeOfInformationUtility',
    'somaticVariantsNonActionable',
  ],
  outcomes: [
    'dateOfAssessment',
    'diseaseResponseOrStatus',
    'otherResponseClassification',
    'minimalResidualDiseaseAssessment',
    'methodOfResponseEvaluation',
    'responseCriteriaUsed',
    'summaryStage',
    'sitesOfAnyProgressionOrRecurrence',
    'vitalStatus',
    'height',
    'weight',
    'heightUnits',
    'weightUnits',
    'performanceStatus',
    'overallSurvivalInMonths',
    'diseaseFreeSurvivalInMonths',
    'siteOfRelapseOrProgression',
    'intervalProgressionOrRecurrence',
    'intervalRegressionOrDecreaseInDisease',
    'levelOfMalignancy',
    'treatmentInducedNeoplasmSite',
    'dateOfDiagnosisOfTreatmentInducedNeoplasm',
  ],
  complications: [
    'date',
    'lateComplicationOfTherapyDeveloped',
    'lateToxicityDetail',
    'suspectedTreatmentInducedNeoplasmDeveloped',
    'treatmentInducedNeoplasmDetails',
  ],
  consents: [
    'consentDate',
    'consentVersion',
    'patientConsentedTo',
    'reasonForRejection',
    'wasAssentObtained',
    'dateOfAssent',
    'assentFormVersion',
    'ifAssentNotObtainedWhyNot',
    'reconsentDate',
    'reconsentVersion',
    'consentingCoordinatorName',
    'previouslyConsented',
    'nameOfOtherBiobank',
    'hasConsentBeenWithdrawn',
    'dateOfConsentWithdrawal',
    'typeOfConsentWithdrawal',
    'reasonForConsentWithdrawal',
    'consentFormComplete',
  ],
  chemotherapies: [
    'startDate',
    'doseFrequency',
    'numberOfCycle',
    'treatingCentreName',
    'doseUnit',
    'treatmentIntent',
    'route',
    'protocolCode',
    'stopDate',
    'dose',
    'daysPerCycle',
    'type',
    'recordingDate',
    'courseNumber',
    'systematicTherapyAgentName',
  ],
  radiotherapies: [
    'radiationSite',
    'siteNumber',
    'startDate',
    'adjacentFractions',
    'radiationType',
    'boostDose',
    'testResult',
    'startIntervalRadRaw',
    'adjacentFields',
    'baseline',
    'technique',
    'stopDate',
    'courseNumber',
    'brachytherapyDose',
    'testResultStd',
    'complete',
    'boostSite',
    'treatedRegion',
    'startIntervalRad',
    'treatingCentreName',
    'totalDose',
    'therapeuticModality',
    'recordingDate',
    'radiotherapyDose',
  ],
  immunotherapies: [
    'startDate',
    'immunotherapyType',
    'immunotherapyTarget',
    'immunotherapyDetail',
    'courseNumber',
  ],
  surgeries: [
    'collectionTimePoint',
    'startDate',
    'site',
    'diagnosisDate',
    'type',
    'stopDate',
    'recordingDate',
    'courseNumber',
  ],
  celltransplants: ['startDate', 'cellSource', 'courseNumber', 'donorType'],
  slides: [
    'tumorNucleiPercent',
    'inflammatoryInfiltrationPercent',
    'necrosisPercent',
    'neutrophilInfiltrationPercent',
    'proliferatingCellsNumber',
    'monocyteInfiltrationPercent',
    'lymphocyteInfiltrationPercent',
    'eosinophilInfiltrationPercent',
    'tumorCellsPercent',
    'stromalCellsPercent',
    'normalCellsPercent',
    'sectionLocation',
    'granulocyteInfiltrationPercent',
  ],
  studies: ['status', 'startDate', 'recordingDate', 'endDate'],
  labtests: [
    'startDate',
    'endDate',
    'testResults',
    'collectionDate',
    'recordingDate',
    'eventType',
    'timePoint',
  ],
};

export default tableSchema;
