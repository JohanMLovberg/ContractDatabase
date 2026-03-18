import { ContractFormData, SubmitContractFormData } from "../models/ContractDatabaseModel";
import { formatDateTimeForForm } from "./dateUtils";

export function formatingForm(form: ContractFormData): SubmitContractFormData {
  return {
    Title: form.Title,
    ContractOwner: form.ContractOwner.Id,
    Department: form.Department.Id,
    OriginalContractOwner: form.OriginalContractOwner,
    Value: form.Value ? Number(form.Value) : 0,
    StartDate: formatDateTimeForForm(form.StartDate),
    EndDate: formatDateTimeForForm(form.EndDate),
    TypeOfContract: form.TypeOfContract,
    ContractBasis: form.ContractBasis,
    AgreementNumber: form.AgreementNumber,
    Vendor: form.Vendor,
    VendorID: form.VendorID,
    ArchiveLink: form.ArchiveLink,
    DataProcessingAgreement: form.DataProcessingAgreement,
    LabourClause: form.LabourClause,
    LabourClauseRiskAssessment: form.LabourClauseRiskAssessment
  };
}