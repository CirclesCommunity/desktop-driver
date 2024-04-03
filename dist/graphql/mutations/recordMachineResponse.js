import { gql } from "@apollo/client/core/index.js";
export const RECORD_MACHINE_RESPONSE = gql `
	mutation recordMachineResponse(
		$tokenInput: String!
		$machineResponseInput: MachineResponseInput!
	) {
		recordMachineResponse(
			token: $tokenInput
			machineResponse: $machineResponseInput
		) {
			_id
			requirementId
			responses {
				globalId
				value
			}
			tenantId
			branchId
			createdBy
			status
			isDeleted
			createdAt
			updatedAt
		}
	}
`;
