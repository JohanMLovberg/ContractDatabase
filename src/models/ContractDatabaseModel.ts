import { IDepartment } from "../mock/departments";
import { IPersonaProps } from 'office-ui-fabric-react';
import { ITypeOfContract } from "../mock/TypeOfContract";
import { IContractBasis } from "../mock/contractBasis";

export interface ContractFormData {
  title: string;
  contractOwner: string;
  originalContractOwner: string;
  department: string;
  value: string;
  startDate: string;
  endDate: string;
  typeOfContract: string;
  contractBasis: string;
  agreementNumber: string;
  vendor: string;
  vendorId: string;
  archiveLink: string;
  dataProcessAgreement: boolean;
  labourClause: boolean;
}

export interface IContractFormProps {
  description: string;
}

export interface IContractFormState {
  form: ContractFormData;
  errors: { [key: string]: string };
  departments: IDepartment[];
  typeOfContract: ITypeOfContract[];
  contractBasis: IContractBasis[];
  apiMessage?: string;
  resetUser: boolean
}

export interface IViewProps {
  form: ContractFormData;
  errors: { [key: string]: string };
  departments: IDepartment[];
  typeOfContract: ITypeOfContract[];
  contractBasis: IContractBasis[];
  apiMessage?: string;
  onInputChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onResolveSuggestions: (filterText: string) => Promise<IPersonaProps[]>;
  resetUser: boolean
}
