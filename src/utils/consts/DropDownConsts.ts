import { IDropDownData } from "../../models/ConstsModel";

export const ContractBasis: IDropDownData[] = [
	{ value: "UM standard contract", label: "UM standard contract" },
	{ value: "Delivery agreement under MFA Framework agreement", label: "Delivery agreement under MFA Framework agreement" },
	{ value: "Delivery agreement (Statens Indkøb)", label: "Delivery agreement (Statens Indkøb)" },
	{ value: "Vendors standard agreement", label: "Vendors standard agreement" },
	{ value: "Delivery agreement (SKI)", label: "Delivery agreement (SKI)" },
	{ value: "MFA Framework Agreement", label: "MFA Framework Agreement" }
];

export const TypeOfContract: IDropDownData[] = [
	{ value: "Service contract", label: "Service contract" },
	{ value: "Goods contract", label: "Goods contract" },
	{ value: "Works contract", label: "Works contract" },
	{ value: "Unknown", label: "Unknown" }
];

export const LabourClauseRiskAssessment: IDropDownData[] = [
	{ value: "lowRisk", label: "Low risk" },
	{ value: "mediumRisk", label: "Medium risk" },
	{ value: "highRisk", label: "High risk" },
	{ value: "unknown", label: "Unknown" },
]