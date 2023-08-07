const checkPatientsEligibility = (patient, treatment) => {
  // TODO: Validate fields
  const ageOfPatient = new Date().getFullYear() - patient.birth;
  if (ageOfPatient > treatment.maxAge || patient.stage > treatment.maxStage) {
    return false;
  }
  return true;
};
export default checkPatientsEligibility;
