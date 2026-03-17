import { IDepartment } from "../mock/departments";
import { IPersonaProps } from 'office-ui-fabric-react';
import { IDropDownData } from "./ConstsModel";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ContractFormData {
  Title: string;
  ContractOwner: string;
  OriginalContractOwner: string;
  Department: string;
  Value: string;
  StartDate: string;
  EndDate: string;
  TypeOfContract: string;
  ContractBasis: string;
  AgreementNumber: string;
  Vendor: string;
  VendorID: string;
  ArchiveLink: string;
  DataProcessingAgreement: boolean;
  LabourClause: boolean;
  LabourClauseRiskAssessment: string;
}

export interface IContractFormProps {
  description: string;
  context: WebPartContext;
}

export interface IContractFormState {
  form: ContractFormData;
  errors: { [key: string]: string };
  departments: IDepartment[];
  typeOfContract: IDropDownData[];
  contractBasis: IDropDownData[];
  apiMessage?: string;
  resetUser: boolean
}

export interface IViewProps {
  form: ContractFormData;
  errors: { [key: string]: string };
  departments: IDepartment[];
  typeOfContract: IDropDownData[];
  contractBasis: IDropDownData[];
  apiMessage?: string;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onResolveSuggestions: (filterText: string) => Promise<IPersonaProps[]>;
  resetUser: boolean
}
