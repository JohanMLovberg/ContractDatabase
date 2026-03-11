import { ContractFormData } from "../models/ContractDatabaseModel";

export const mockContractFormData: ContractFormData = {
  title: "IT Support Agreement",
  contractOwner: "John Doe",
  originalContractOwner: "Jane Smith",
  department: "Finance",
  value: "150000",
  startDate: "2025-01-01",
  endDate: "2027-01-01",
  typeOfContract: "Purchase",
  contractBasis: "Fixed",
  agreementNumber: "AGR-2025-001",
  vendor: "Tech Solutions ApS",
  vendorId: "CVR-12345678",
  archiveLink: "https://archive.company.com/contracts/AGR-2025-001",
  dataProcessAgreement: true,
  labourClause: false,
};