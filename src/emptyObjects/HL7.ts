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

export const CBC_RESULT_MAPPING: { [code: string]: string } = {
	"08001": "C_TAKE_MODE",
	"08002": "C_BLOOD_MODE",
	"01002": "C_REFERENCE_GROUP",
	"6690-2": "C_WHITE_BLOOD_CELL_COUNT",
	"731-0": "C_LYMPHOCYTE_COUNT",
	"736-9": "C_LYMPHOCYTE_PERCENTAGE",
	"789-8": "C_RED_BLOOD_CELL_COUNT",
	"718-7": "C_HEMOGLOBIN",
	"787-2": "C_MEAN_CORPUSCULAR_VOLUME",
	"785-6": "C_MEAN_CORPUSCULAR_HEMOGLOBIN",
	"786-4": "C_MEAN_CORPUSCULAR_HEMOGLOBIN_CONCENTRATION",
	"788-0": "C_RED_CELL_DISTRIBUTION_WIDTH_-_COEFFICIENT_OF_VARIATION",
	"21000-5": "C_RED_CELL_DISTRIBUTION_WIDTH_-_STANDARD_DEVIATION",
	"4544-3": "C_HEMATOCRIT",
	"777-3": "C_PLATELET_COUNT",
	"32623-1": "C_MEAN_PLATELET_VOLUME",
	"32207-3": "C_PLATELET_DISTRIBUTION_WIDTH",
	"10002": "C_PLATELETCRIT",
	"10027": "C_MID-SIZED_CELLS_COUNT",
	"10029": "C_MID-SIZED_CELLS_PERCENTAGE",
	"10028": "C_GRANULOCYTE_COUNT",
	"10030": "C_GRANULOCYTE_PERCENTAGE",
	"10013": "C_PLATELET_LARGE_CELL_COUNT",
	"10014": "C_PLATELET_LARGE_CELL_RATIO",
};
