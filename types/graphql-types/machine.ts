export type MachineResponse = {
	_id: string;
	// requirementId: string;
	containerId: number;
	responses: {
		globalInputId: string;
		value: string;
	}[];
	used: boolean;
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
	"containerId" | "responses" | "branchId"
>;
