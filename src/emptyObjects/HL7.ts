import {
	MSHObjectType,
	OBRObjectType,
	PIDObjectType,
	PV1ObjectType,
} from "../../types/HL7Types.js";

export const emptyMSH: MSHObjectType = {
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

export const emptyPID: PIDObjectType = {
	serialNumber: "",
	IdentificationLists: "", // Assuming a default format or placeholder
	name: "firstName^lastName", // Provide a sample or placeholder name
	dateTimeOfBirth: "",
	gender: "",
};

export const emptyPV1: PV1ObjectType = {
	serialNumber: "",
	patientClass: "",
	patientLocation: "Department ^^ Bed No.", // Placeholder format
};

export const emptyOBR: OBRObjectType = {
	fieldSeparator: "",
	encodingCharacters: "",
	sampleId: "",
	universalServiceIdentifier: "",
	dateTimeOfCollection: "",
	dateTimeOfAnalysis: "",
	veterinarian: "",
	clinicalInfo: "",
	dateTimeOfSpecimenCollection: "",
	diagnosisMarkerId: "",
	PrincipalResultInterpreter: "",
};
