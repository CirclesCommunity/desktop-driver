export type MachineResponse = {
	_id: string;
	requirementId: number;
	responses: {
		globalId: string;
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
