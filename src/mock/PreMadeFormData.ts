import { ContractFormData } from "../models/ContractDatabaseModel";

export const mockContractFormData: ContractFormData = {
  Title: "IT Support Agreement",
  ContractOwner: 
  {
    id: "i:0#.w|mikkel.jensen",
    name: "Mikkel Jensen"
  },
  OriginalContractOwner: "Jane Smith",
  Department: 
  {
    Id: 2,
    Title: "Finance"
  },
  Value: "150000",
  StartDate: "2026-03-12T14:30:00.000Z",
  EndDate: "2026-04-12T14:30:00.000Z",
  TypeOfContract: "Service contract",
  ContractBasis: "MFA Framework Agreement",
  AgreementNumber: "AGR-2025-001",
  Vendor: "Tech Solutions ApS",
  VendorID: "CVR-12345678",
  ArchiveLink: "https://archive.company.com/contracts/AGR-2025-001",
  DataProcessingAgreement: false,
  LabourClause: true,
  LabourClauseRiskAssessment: "mediumRisk"
};