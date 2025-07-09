import type { MachineResponse } from "@/types/graphql-types/machine.js";
import type {
	HL7Message,
	MessageDelimiters,
	MSHObjectType,
	OBRObjectType,
	OBXObjectType,
	PIDObjectType,
	PV1ObjectType,
} from "../types/HL7Types.js";
import {
	BK200_RESULT_MAPPING,
	CBC_RESULT_MAPPING,
	emptyMSH,
	emptyOBR,
	emptyPID,
	emptyPV1,
} from "./emptyObjects/HL7.js";
import { sendMachineResponse } from "../api/mutate/sendResultInputs.js";
import { parse } from "path";

function formatMachineDate(machineDate: string) {
	// machineDate = YYYYMMDDHHMMSS
	const formattedDate =
		machineDate.slice(0, 4) +
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

function getFieldDelimiter(HL7Message: string) {
	const fieldDelimiter = HL7Message.charAt(3);
	return fieldDelimiter;
}

function getDelimiters(encodingCharacters: string): MessageDelimiters {
	const delimiters = {
		componentDelimiter: encodingCharacters[0],
		repetitionDelimiter: encodingCharacters[1],
		escapeDelimiter: encodingCharacters[2],
		subcomponentDelimiter: encodingCharacters[3],
	};
	return delimiters;
}

function decodeFieldEscapedDelimiters(
	HL7Field: string,
	delimiters: MessageDelimiters
): string {
	const decodedField = HL7Field.replaceAll(
		delimiters.escapeDelimiter + "F" + delimiters.escapeDelimiter,
		delimiters.fieldDelimiter || "|"
	)
		.replaceAll(
			delimiters.escapeDelimiter + "S" + delimiters.escapeDelimiter,
			delimiters.componentDelimiter
		)
		.replaceAll(
			delimiters.escapeDelimiter + "T" + delimiters.escapeDelimiter,
			delimiters.subcomponentDelimiter
		)
		.replaceAll(
			delimiters.escapeDelimiter + "R" + delimiters.escapeDelimiter,
			delimiters.repetitionDelimiter
		)
		.replaceAll(
			delimiters.escapeDelimiter + "R" + delimiters.escapeDelimiter,
			delimiters.repetitionDelimiter
		)
		.replaceAll(
			delimiters.escapeDelimiter + "E" + delimiters.escapeDelimiter,
			delimiters.escapeDelimiter
		)
		.replaceAll(
			delimiters.escapeDelimiter + ".br" + delimiters.escapeDelimiter,
			"\r"
		);
	return decodedField;
}

const readMSH = (HL7MSH: string, fieldDelimiter: string): MSHObjectType => {
	// const fieldDelimiter = getFieldDelimiter(HL7MSH);
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

const readOBR = (HL7OBR: string, fieldDelimiter: string): OBRObjectType => {
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

const readOBX = (HL7OBX: string, fieldDelimiter: string): OBXObjectType => {
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

const readPID = (HL7PID: string, fieldDelimiter: string): PIDObjectType => {
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

const readPV1 = (HL7PV1: string, fieldDelimiter: string): PV1ObjectType => {
	const fields = HL7PV1.split(fieldDelimiter);
	const PV1Object = {
		serialNumber: fields[1],
		patientClass: fields[2],
		patientLocation: fields[3], // Department ^^ Bed No.
	};
	return PV1Object;
};

const getGlobalIdFromMachineId_sysmex = (
	machineIdentifier: string // "CODE^LABEL^CODE_SOURCE"
): string => {
	const code = machineIdentifier.split("^")[0];
	return CBC_RESULT_MAPPING[code] || machineIdentifier;
};

const getGlobalIdFromMachineId_BK200 = (
	machineIdentifier: string // "CODE^LABEL^CODE_SOURCE"
): string => {
	const code = machineIdentifier.split("^")[0];
	return BK200_RESULT_MAPPING[code] || machineIdentifier;
};

export function parseAndSendLabTestResultHL7(HL7Message: string) {
	// Split the message into segments
	const segments = HL7Message.split("\r");
	const fieldDelimiter = getFieldDelimiter(HL7Message);

	// Initialize the result object
	let parsedHL7Message: HL7Message = { // HL7 message parsed object
		MSH: { ...emptyMSH },
		PID: { ...emptyPID }, // Initialize PID object
		PV1: { ...emptyPV1 }, // Initialize PV1 object
		OBR: { ...emptyOBR },
		OBX: [],
	};
	segments.forEach((segment) => {
		const segmentType = segment.substring(0, 3);
		switch (segmentType) {
			case "MSH":
				parsedHL7Message.MSH = readMSH(segment, fieldDelimiter);
				break;
			case "PID":
				parsedHL7Message.PID = readPID(segment, fieldDelimiter);
				// Format the date of birth
				parsedHL7Message.PID.dateTimeOfBirth = formatMachineDate(
					parsedHL7Message.PID.dateTimeOfBirth || ""
				);
				break;
			case "PV1":
				parsedHL7Message.PV1 = readPV1(segment, fieldDelimiter);
				break;
			case "OBR":
				parsedHL7Message.OBR = readOBR(segment, fieldDelimiter);
				// Format dates in the OBR segment
				parsedHL7Message.OBR.dateTimeOfCollection = formatMachineDate(
					parsedHL7Message.OBR.dateTimeOfCollection || ""
				);
				parsedHL7Message.OBR.dateTimeOfAnalysis = formatMachineDate(
					parsedHL7Message.OBR.dateTimeOfAnalysis || ""
				);
				parsedHL7Message.OBR.dateTimeOfSpecimenCollection =
					formatMachineDate(
						parsedHL7Message.OBR.dateTimeOfSpecimenCollection || ""
					);
				break;
			case "OBX":
				let obx = readOBX(segment, fieldDelimiter);
				// Decode potentially escaped delimiters in OBX observation values
				obx.observationValue = decodeFieldEscapedDelimiters(
					obx.observationValue,
					getDelimiters(parsedHL7Message.MSH.encodingCharacters)
				);
				parsedHL7Message.OBX.push(obx);
				break;
			default:
				break;
		}
	});

	
	
	if (parsedHL7Message.OBR.sampleId) {

		console.log(`\nDevice: ${parsedHL7Message.MSH.sendingApplication} \n`);
		console.log(`\nSecurity: ${parsedHL7Message.MSH.security} \n`);
		console.log(`\nType: ${parsedHL7Message.MSH.messageType} \n`);
		parsedHL7Message.OBX.forEach((value, index) => {
			console.log(`\nOBX[${index}] { \n`);
			console.log(`\nIdentifier: ${parsedHL7Message.OBX[index].observationIdentifier} \n`);
			console.log(`\nIdentifier: ${parsedHL7Message.OBX[index].observationValue} \n`);
			console.log(`}\n`);
		});
		
		const responses: MachineResponse["responses"] = [];

		parsedHL7Message.OBX.forEach((obx) => {

			if (parsedHL7Message.MSH.sendingApplication === "BK-200") {
				responses.push({
					globalInputId: getGlobalIdFromMachineId_BK200(
						obx.observationIdentifier
					),
					value: obx.observationValue,
				});

			} else {
				responses.push({
					globalInputId: getGlobalIdFromMachineId_sysmex(
						obx.observationIdentifier
					),
					value: obx.observationValue,
				});
			}
		});
		sendMachineResponse({
			responses,
			branchId: "1919",
			containerId: Number(parsedHL7Message.OBR.sampleId) || 2,
		});
	}

	return parsedHL7Message;
};



