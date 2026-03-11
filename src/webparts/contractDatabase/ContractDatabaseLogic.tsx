import { ContractFormData } from "../../models/ContractDatabaseModel";
import { IDepartment } from "../../mock/departments";
import contractBaseApi from "../../services/ContractDatabaseApi";
import { IContractBasis } from "../../mock/contractBasis";
import { ITypeOfContract } from "../../mock/TypeOfContract";

export class ContractFormLogic {
  private api = new contractBaseApi();

  public createEmptyForm(): ContractFormData {
    return {
      title: "",
      contractOwner: "",
      originalContractOwner: "",
      department: "",
      value: "",
      startDate: "",
      endDate: "",
      typeOfContract: "",
      contractBasis: "",
      agreementNumber: "",
      vendor: "",
      vendorId: "",
      archiveLink: "",
      dataProcessAgreement: false,
      labourClause: false
    };
  }

  public updateField(
    form: ContractFormData,
    name: string,
    value: any
  ): ContractFormData {
    return {...form,[name]: value};
  }

  public validate(form: ContractFormData) {
    const errors: { [key: string]: string } = {};

    if (!form.title) errors.title = "Title is required";
    if (!form.department) errors.department = "Department is required";
    if (!form.value) errors.value = "Value is required";
    if (!form.typeOfContract) errors.typeOfContract = "Type of contract required";
    if (!form.startDate) errors.startDate = "Start date required";
    if (!form.endDate) errors.endDate = "End date required";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      errors.endDate = "End date must be after start date";
    }
    return errors;
  }

  public async submit(form: ContractFormData) {
    return this.api.submitContractDatabase(form);
  }

  public async getUsers(filterText: string) {
    if (!filterText) return [];
    const users = await this.api.peoplePickerMock(filterText);
    return users.map(u => ({
      key: u.Key,
      text: u.DisplayText,
      primaryText: u.DisplayText,
      secondaryText: u.EntityData.Email,
      tertiaryText: u.EntityData.Department,
      optionalText: u.Description
    }));
  }

  public async getDepartments(): Promise<IDepartment[]> {
    return this.api.getDepartmentListMock();
  }

  public async getTypeOfContract(): Promise<ITypeOfContract[]> {
    return this.api.getTypeOfContractListMock();
  }

  public async getContractBasis(): Promise<IContractBasis[]> {
    return this.api.getContractBasisListMock();
  }

  public async getContractForm(): Promise<ContractFormData> {
    return this.api.getContractFormMock();
  }
}