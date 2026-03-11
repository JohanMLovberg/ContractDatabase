export type ITypeOfContract = {
  value: number;
  label: string;
}

export const mockTypeOfContract: ITypeOfContract[] = [
	{ value: 1, label: "Service" },
	{ value: 2, label: "Purchase" },
	{ value: 3, label: "Lease" }
];
