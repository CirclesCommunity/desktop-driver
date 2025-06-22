import type {
	MachineResponse,
	MachineResponseInput,
} from "@/types/graphql-types/machine.js";
import { client } from "../../client/src/index.js";
import { RECORD_MACHINE_RESPONSE } from "../../graphql/mutations/recordMachineResponse.js";

export const sendMachineResponse = async (
	machineResponseInput: MachineResponseInput
) => {
	const tokenInput = process.env.TOKEN_INPUT;
	const result = await client.mutate<MachineResponse>({
		mutation: RECORD_MACHINE_RESPONSE,
		variables: {
			tokenInput,
			machineResponseInput,
		},
	});

	if (result.errors) {
		console.error(result.errors);
		return undefined;
	}

	console.log("✅✅✅✅✅✅ RESULT SENT SUCCESSFULLY ✅✅✅✅✅✅");

	return result.data;
};
