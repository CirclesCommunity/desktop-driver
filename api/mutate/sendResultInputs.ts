import {
	MachineResponse,
	MachineResponseInput,
} from "@/types/graphql-types/machine.js";
import { client } from "../../client/src/index.js";
import { RECORD_MACHINE_RESPONSE } from "../../graphql/mutations/recordMachineResponse.js";

export const sendMachineResponse = async (
	machineResponseInput: MachineResponseInput
) => {
	const tokenInput =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODlkYWQyYzliYTQyZGQyNjVhMjhiYiIsInRlbmFudCI6IjY1NWQ4N2ZlYTIwMGI3M2QwNDJlN2UzMiIsIm9yZ25pemF0aW9uSWQiOiI2NTVkODdmZWEyMDBiNzNkMDQyZTdlMzIiLCJpYXQiOjE3MDg3MDQ0MzQsImV4cCI6MzQxODU1NjU5Mn0.h-HsnzXiav4m8jGVqWlB2xvtMJJwAFbi6udN9S1bwvQ";
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
