import { ContractFormData } from "../../models/ContractDatabaseModel";
import { IDepartment } from "../../mock/departments";
import contractBaseApi from "../../services/ContractDatabaseApi";
import { formatDateToSPFx } from "../../utils/dateUtils";
import { APIResponse } from "../../models/ApiModel";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class ContractFormLogic {
  private api: contractBaseApi;

    constructor(context: WebPartContext) {
    this.api = new contractBaseApi(context.pageContext.web.absoluteUrl);
  }

  public createEmptyForm(): ContractFormData {
    return {
      Title: "",
      ContractOwner: "",
      OriginalContractOwner: "",
      Department: "",
      Value: "",
      StartDate: "",
      EndDate: "",
      TypeOfContract: "",
      ContractBasis: "",
      AgreementNumber: "",
      Vendor: "",
      VendorID: "",
      ArchiveLink: "",
      DataProcessingAgreement: false,
      LabourClause: false,
      LabourClauseRiskAssessment: ""
    };
  }

  public updateField(
    form: ContractFormData,
    name: string,
    value: any
  ): ContractFormData {

    return {...form,[name]: value};
  }

  public validate(form: ContractFormData):{[key: string]: string;} {
    const errors: { [key: string]: string } = {};

    if (!form.Title) errors.title = "Title is required";
    if (!form.Department) errors.department = "Department is required";
    if (!form.Value) errors.value = "Value is required";
    if (!form.TypeOfContract) errors.typeOfContract = "Type of contract required";
    if (!form.StartDate) errors.startDate = "Start date required";
    if (!form.EndDate) errors.endDate = "End date required";
    if (form.StartDate && form.EndDate && form.EndDate < form.StartDate) {
      errors.endDate = "End date must be after start date";
    }
    if(form.LabourClause && !form.LabourClauseRiskAssessment) {
      errors.LabourClauseRiskAssessment = "Labour Clause Risk Assessment required";
    }
    return errors;
  }

  public async submit(form: ContractFormData): Promise<APIResponse> {
    form.EndDate = formatDateToSPFx(form.EndDate);
    form.StartDate = formatDateToSPFx(form.StartDate);
    return this.api.submitContractDatabase(form);
  }

  public async editForm(form: ContractFormData, id: number): Promise<APIResponse> {
    form.EndDate = formatDateToSPFx(form.EndDate);
    form.StartDate = formatDateToSPFx(form.StartDate);
    return this.api.editContractDatabaseForm(form, id);
  }

  public async getUsers(filterText: string): Promise<{
    key: string;
    text: string;
    primaryText: string;
    secondaryText: string;
    tertiaryText: string;
    optionalText: string;
    }[]> {
    if (!filterText) return [];
    const users = await this.api.peoplePicker(filterText);
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
    return this.api.getDepartmentList();
  }

  public async getContractForm(id?: number): Promise<ContractFormData> {
    return this.api.getContractFormById(id);
  }
}