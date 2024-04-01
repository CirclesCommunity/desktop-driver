export type MessageDelimiters = {
	componentDelimiter: string;
	repetitionDelimiter: string;
	escapeDelimiter: string;
	subcomponentDelimiter: string;
	fieldDelimiter?: string;
};

export type MSHObjectType = {
	fieldSeparator: string;
	encodingCharacters: string;
	sendingApplication: string;
	sendingFacility: string;
	receivingApplication: string;
	receivingFacility: string;
	dateTimeOfMessage: string;
	security: string;
	messageType: string;
	messageControlID: string;
	processingID: string;
	versionID: string;
	sequenceNumber?: string; // Optional
	continuationPointer?: string; // Optional
	acceptAcknowledgmentType?: string; // Optional
	applicationAcknowledgmentType?: string; // Optional
	countryCode?: string; // Optional
	characterSet?: string; // Optional
	principalLanguageOfMessage?: string; // Optional
};

export type OBRObjectType = {
	fieldSeparator: string;
	encodingCharacters: string;
	fieldOrderNumber: string;
	universalServiceIdentifier: string;
	dateTimeOfCollection: string; // Optional since it skips fields[5]
	dateTimeOfAnalysis: string; // Optional since it skips fields[5] through fields[6]
	veterinarian: string; // Optional since it skips fields[8] and fields[9]
	clinicalInfo: string; // Optional since it skips fields[11] through fields[12]
	dateTimeOfSpecimenCollection: string; // Optional since it skips fields[15] through fields[23]
	diagnosisMarkerId: string; // Optional since it skips fields[25] through fields[31]
	PrincipalResultInterpreter: string; // Provided without skipping, but not all preceding fields are required
};
export type OBXObjectType = {
	fieldId: string;
	valueDataType: string;
	observationIdentifier: string; // Represents "Id ^ Name ^ Encode system"
	observationValue: string;
	units: string;
	referenceRange: string; // Represents "normalRange"
	abnormalFlags: string; // "N" for normal, "A" for abnormal, "H" for high, "L" for low
	resultStatus: string;
	AccessFlags?: string; // "E" for result edited, "O" for reagent expiration, "e" for result changed due to manual editing of another parameter
};

export type PIDObjectType = {
	serialNumber: string;
	IdentificationLists: string; // "ID ^^^ MR." indicating structured or compound data
	name: string; // "firstName^lastName" suggesting a format for compound names
	dateTimeOfBirth: string;
	gender: string;
};

export type PV1ObjectType = {
	serialNumber: string;
	patientClass: string;
	patientLocation: string; // "Department ^^ Bed No.", indicating a structured format with department and bed number.
};

export type LabTest = {
	MSH: MSHObjectType;
	PID: PIDObjectType;
	PV1: PV1ObjectType;
	OBR: OBRObjectType;
	OBX: OBXObjectType[];
};
