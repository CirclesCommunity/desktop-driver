export type MachineResponse = {
	_id: string;
	requirementId: number;
	responses: {
		globalInputId: string;
		value: string;
	}[];
	tenantId: string;
	branchId: string;
	createdBy: string;
	status: string;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
};

export type MachineResponseInput = Pick<
	MachineResponse,
	"requirementId" | "responses" | "branchId"
>;
