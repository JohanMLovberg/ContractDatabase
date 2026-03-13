import { ContractFormData } from "../models/ContractDatabaseModel";

export const mockContractFormData: ContractFormData = {
  Title: "IT Support Agreement",
  ContractOwner: "John Doe",
  OriginalContractOwner: "Jane Smith",
  Department: "Finance",
  Value: "150000",
  StartDate: "2026-03-12T14:30:00.000Z",
  EndDate: "2026-04-12T14:30:00.000Z",
  TypeOfContract: "Purchase",
  ContractBasis: "Fixed",
  AgreementNumber: "AGR-2025-001",
  Vendor: "Tech Solutions ApS",
  VendorID: "CVR-12345678",
  ArchiveLink: "https://archive.company.com/contracts/AGR-2025-001",
  DataProcessingAgreement: true,
  LabourClause: false,
  LabourClauseRiskAssessment: ""
};