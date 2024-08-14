import { emptyMSH, emptyOBR, emptyPID, emptyPV1 } from "./emptyObjects/HL7.js";
import { sendMachineResponse } from "../api/mutate/sendResultInputs.js";
function formatMachineDate(machineDate) {
    // machineDate = YYYYMMDDHHMMSS
    const formattedDate = machineDate.slice(0, 4) +
        "-" +
        machineDate.slice(4, 6) +
        "-" +
        machineDate.slice(6, 8) +
        "T" +
        machineDate.slice(8, 10) +
        ":" +
        machineDate.slice(10, 12) +
        ":" +
        machineDate.slice(12, 14);
    return formattedDate;
}
function getFieldDelimiter(HL7Message) {
    const fieldDelimiter = HL7Message.charAt(3);
    return fieldDelimiter;
}
function getDelimiters(encodingCharacters) {
    const delimiters = {
        componentDelimiter: encodingCharacters[0],
        repetitionDelimiter: encodingCharacters[1],
        escapeDelimiter: encodingCharacters[2],
        subcomponentDelimiter: encodingCharacters[3],
    };
    return delimiters;
}
function decodeFieldEscapedDelimiters(HL7Field, delimiters) {
    const decodedField = HL7Field.replaceAll(delimiters.escapeDelimiter + "F" + delimiters.escapeDelimiter, delimiters.fieldDelimiter || "|")
        .replaceAll(delimiters.escapeDelimiter + "S" + delimiters.escapeDelimiter, delimiters.componentDelimiter)
        .replaceAll(delimiters.escapeDelimiter + "T" + delimiters.escapeDelimiter, delimiters.subcomponentDelimiter)
        .replaceAll(delimiters.escapeDelimiter + "R" + delimiters.escapeDelimiter, delimiters.repetitionDelimiter)
        .replaceAll(delimiters.escapeDelimiter + "R" + delimiters.escapeDelimiter, delimiters.repetitionDelimiter)
        .replaceAll(delimiters.escapeDelimiter + "E" + delimiters.escapeDelimiter, delimiters.escapeDelimiter)
        .replaceAll(delimiters.escapeDelimiter + ".br" + delimiters.escapeDelimiter, "\r");
    return decodedField;
}
const readMSH = (HL7MSH) => {
    const fieldDelimiter = getFieldDelimiter(HL7MSH);
    const fields = HL7MSH.split(fieldDelimiter);
    const mshObject = {
        fieldSeparator: fields[1],
        encodingCharacters: fields[2],
        sendingApplication: fields[3],
        sendingFacility: fields[4],
        receivingApplication: fields[5],
        receivingFacility: fields[6],
        dateTimeOfMessage: fields[7],
        security: fields[8],
        messageType: fields[9],
        messageControlID: fields[10],
        processingID: fields[11],
        versionID: fields[12],
        sequenceNumber: fields[13], // Optional
        continuationPointer: fields[14], // Optional
        acceptAcknowledgmentType: fields[15], // Optional
        applicationAcknowledgmentType: fields[16], // Optional
        countryCode: fields[17], // Optional
        characterSet: fields[18], // Optional
        principalLanguageOfMessage: fields[19], // Optional
    };
    return mshObject;
};
const readOBR = (HL7OBR, fieldDelimiter) => {
    const fields = HL7OBR.split(fieldDelimiter);
    const obrObject = {
        fieldSeparator: fields[1],
        encodingCharacters: fields[2],
        sampleId: fields[3],
        universalServiceIdentifier: fields[4],
        dateTimeOfCollection: fields[6],
        dateTimeOfAnalysis: fields[7],
        veterinarian: fields[10],
        clinicalInfo: fields[13],
        dateTimeOfSpecimenCollection: fields[14],
        diagnosisMarkerId: fields[24],
        PrincipalResultInterpreter: fields[32],
    };
    return obrObject;
};
const readOBX = (HL7OBX, fieldDelimiter) => {
    const fields = HL7OBX.split(fieldDelimiter);
    const obxObject = {
        fieldId: fields[1],
        valueDataType: fields[2],
        observationIdentifier: fields[3], // Id ^ Name ^ Encode system
        observationValue: fields[5],
        units: fields[6],
        referenceRange: fields[7], // normalRange
        abnormalFlags: fields[8], // N normal A abnormal H high L low
        resultStatus: fields[11],
        AccessFlags: fields[20], // E: result edited, O: reagent expiration, e:result changed due to the manual editing of another parameter result based on which it is calculated
    };
    return obxObject;
};
const readPID = (HL7PID, fieldDelimiter) => {
    const fields = HL7PID.split(fieldDelimiter);
    const pIDObject = {
        serialNumber: fields[1],
        IdentificationLists: fields[3], // ID ^^^ MR.
        name: fields[5], // firstName^lastName.
        dateTimeOfBirth: fields[7],
        gender: fields[8],
    };
    return pIDObject;
};
const readPV1 = (HL7PV1, fieldDelimiter) => {
    const fields = HL7PV1.split(fieldDelimiter);
    const PV1Object = {
        serialNumber: fields[1],
        patientClass: fields[2],
        patientLocation: fields[3], // Department ^^ Bed No.
    };
    return PV1Object;
};
const getGlobalIdFromMachineId = (id) => id;
export function parseAndSendLabTestResultHL7(HL7Message) {
    // Split the message into segments
    const segments = HL7Message.split("\r");
    const fieldDelimiter = getFieldDelimiter(HL7Message);
    // Initialize the result object
    let labTestResult = {
        MSH: Object.assign({}, emptyMSH),
        PID: Object.assign({}, emptyPID), // Initialize PID object
        PV1: Object.assign({}, emptyPV1), // Initialize PV1 object
        OBR: Object.assign({}, emptyOBR),
        OBX: [],
    };
    segments.forEach((segment) => {
        const segmentType = segment.substring(0, 3);
        switch (segmentType) {
            case "MSH":
                labTestResult.MSH = readMSH(segment);
                break;
            case "PID":
                labTestResult.PID = readPID(segment, fieldDelimiter);
                // Format the date of birth
                labTestResult.PID.dateTimeOfBirth = formatMachineDate(labTestResult.PID.dateTimeOfBirth || "");
                break;
            case "PV1":
                labTestResult.PV1 = readPV1(segment, fieldDelimiter);
                break;
            case "OBR":
                labTestResult.OBR = readOBR(segment, fieldDelimiter);
                // Format dates in the OBR segment
                labTestResult.OBR.dateTimeOfCollection = formatMachineDate(labTestResult.OBR.dateTimeOfCollection || "");
                labTestResult.OBR.dateTimeOfAnalysis = formatMachineDate(labTestResult.OBR.dateTimeOfAnalysis || "");
                labTestResult.OBR.dateTimeOfSpecimenCollection =
                    formatMachineDate(labTestResult.OBR.dateTimeOfSpecimenCollection || "");
                break;
            case "OBX":
                let obx = readOBX(segment, fieldDelimiter);
                // Decode potentially escaped delimiters in OBX observation values
                obx.observationValue = decodeFieldEscapedDelimiters(obx.observationValue, getDelimiters(labTestResult.MSH.encodingCharacters));
                labTestResult.OBX.push(obx);
                break;
            default:
                break;
        }
    });
    if (labTestResult.OBR.sampleId) {
        const responses = [];
        labTestResult.OBX.forEach((obx) => {
            responses.push({
                globalInputId: getGlobalIdFromMachineId(obx.observationIdentifier),
                value: obx.observationValue,
            });
        });
        sendMachineResponse({ responses, branchId: "123", requirementId: 2 });
    }
    return labTestResult;
}
