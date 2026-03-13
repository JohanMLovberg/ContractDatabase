import { IDropDownData } from "../../models/ConstsModel";

export const ContractBasis: IDropDownData[] = [
	{ value: "1", label: "UM standard contract" },
	{ value: "2", label: "Delivery agreement under MFA Framework agreement" },
	{ value: "3", label: "Delivery agreement (Statens Indkøb)" },
	{ value: "4", label: "Vendors standard agreement" },
	{ value: "5", label: "Delivery agreement (SKI)" },
	{ value: "6", label: "MFA Framework Agreement" }
];

export const TypeOfContract: IDropDownData[] = [
	{ value: "1", label: "Service contract" },
	{ value: "2", label: "Goods contract" },
	{ value: "3", label: "Works contract" },
	{ value: "4", label: "Unknown" }
];

export const LabourClauseRiskAssessment: IDropDownData[] = [
	{ value: "lowRisk", label: "Low risk" },
	{ value: "mediumRisk", label: "Medium risk" },
	{ value: "highRisk", label: "High risk" },
	{ value: "unknown", label: "Unknown" },
]