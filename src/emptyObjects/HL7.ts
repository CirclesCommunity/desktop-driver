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
	"08001": "Take Mode",
	"08002": "Blood Mode",
	"01002": "Reference Group",
	"6690-2": "White Blood Cell Count (WBC)",
	"731-0": "Lymphocyte Count (LYM#)",
	"736-9": "Lymphocyte Percentage (LYM%)",
	"789-8": "Red Blood Cell Count (RBC)",
	"718-7": "Hemoglobin (HGB)",
	"787-2": "Mean Corpuscular Volume (MCV)",
	"785-6": "Mean Corpuscular Hemoglobin (MCH)",
	"786-4": "Mean Corpuscular Hemoglobin Concentration (MCHC)",
	"788-0": "Red Cell Distribution Width - Coefficient of Variation (RDW-CV)",
	"21000-5": "Red Cell Distribution Width - Standard Deviation (RDW-SD)",
	"4544-3": "Hematocrit (HCT)",
	"777-3": "Platelet Count (PLT)",
	"32623-1": "Mean Platelet Volume (MPV)",
	"32207-3": "Platelet Distribution Width (PDW)",
	"10002": "Plateletcrit (PCT)",
	"10027": "Mid-sized Cells Count (MID#)",
	"10029": "Mid-sized Cells Percentage (MID%)",
	"10028": "Granulocyte Count (GRAN#)",
	"10030": "Granulocyte Percentage (GRAN%)",
	"10013": "Platelet Large Cell Count (PLCC)",
	"10014": "Platelet Large Cell Ratio (PLCR)",
};
