import { gql } from "../../node_modules/@apollo/client/index";

const RECORD_MACHINE_RESPONSE_INPUT = gql`
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
