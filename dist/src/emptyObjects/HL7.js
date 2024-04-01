export const emptyMSH = {
    fieldSeparator: "",
    encodingCharacters: "",
    sendingApplication: "",
    sendingFacility: "",
    receivingApplication: "",
    receivingFacility: "",
    dateTimeOfMessage: "",
    security: "",
    messageType: "",
    messageControlID: "",
    processingID: "",
    versionID: "",
    // Optional fields can be omitted or included as needed
};
export const emptyPID = {
    serialNumber: "",
    IdentificationLists: "", // Assuming a default format or placeholder
    name: "firstName^lastName", // Provide a sample or placeholder name
    dateTimeOfBirth: "",
    gender: "",
};
export const emptyPV1 = {
    serialNumber: "",
    patientClass: "",
    patientLocation: "Department ^^ Bed No.", // Placeholder format
};
export const emptyOBR = {
    fieldSeparator: "",
    encodingCharacters: "",
    fieldOrderNumber: "",
    universalServiceIdentifier: "",
    dateTimeOfCollection: "",
    dateTimeOfAnalysis: "",
    veterinarian: "",
    clinicalInfo: "",
    dateTimeOfSpecimenCollection: "",
    diagnosisMarkerId: "",
    PrincipalResultInterpreter: "",
};
