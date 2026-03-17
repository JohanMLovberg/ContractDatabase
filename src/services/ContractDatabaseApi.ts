import { APIResponse } from "../models/ApiModel";
import BaseApi from "./BaseApi";
import { PeoplePickerEntity, sp, PeoplePickerEntityData } from 'sp-pnp-js';
import { SPpeople } from "../mock/people";
import { mockDepartments } from "../mock/departments";
import { ContractFormData } from "../models/ContractDatabaseModel";
import { mockContractFormData } from "../mock/PreMadeFormData";
import { formatDateTimeForForm } from '../utils/dateUtils';
import { YesNoToBoolean } from "../utils/booleanUtils";
import { IDepartment } from "../models/Department";

export default class ContractDatabaseApi extends BaseApi {

  public async submitContractDatabase(formData: ContractFormData): Promise<APIResponse> {
    // Add metadata type for SharePoint
    const payload = {
      __metadata: { type: "SP.Data.ContractdatabaseListItem" },
      ...formData
    };

    return this.handleRequest(() =>
      this.apiClient.post("/_api/web/lists/getByTitle('Contract Database')/items", payload)
    );
  }

  // Update an existing list item
  public async editContractDatabaseForm(formData: ContractFormData, id: number): Promise<APIResponse> {
    const payload = {
      __metadata: { type: "SP.Data.ContractdatabaseListItem" },
      ...formData
    };

    return this.handleRequest(() =>
      this.apiClient.post(
        `/_api/web/lists/getByTitle('Contract Database')/items(${id})`,
        payload,
        {
          headers: {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*"
          }
        }
      )
    );
  }

  public async peoplePicker(inputString: string): Promise<PeoplePickerEntity[]> {
    const users = await sp.profiles.clientPeoplePickerSearchUser({
      QueryString: inputString,
      MaximumEntitySuggestions: 5
    });
    return users;
  }

  public async peoplePickerMock(inputString: string): Promise<PeoplePickerEntity[]> {
    return new Promise<PeoplePickerEntity[]>((resolve) => {
      const filtered = SPpeople
        .filter(p => p.DisplayText.toLowerCase().indexOf(inputString.toLowerCase()) !== -1)
        .slice(0, 5)
        .map<PeoplePickerEntity>(p => ({
          Key: p.Key,
          DisplayText: p.DisplayText,
          Description: p.Key,
          EntityType: "User",
          IsResolved: true,
          MultipleMatches: [],
          ProviderDisplayName: "User",
          ProviderName: "SP",
          EntityData: {
            Title: p.EntityData.Title,
            Department: p.EntityData.Department,
            Email: p.EntityData.Email
          } as PeoplePickerEntityData
        }));

      resolve(filtered);
    });
  }

  public async getDepartmentList(): Promise<IDepartment[]> {
    const allLists = await sp.web.lists.select("Title", "Id").get();
    const departmentList = allLists.find(l => l.Title === "Departments");
    if (!departmentList) return [];

    let items: IDepartment[] = await sp.web.lists.getById(departmentList.Id).items.get();
    return items;
  }

  public async getDepartmentListMock(): Promise<IDepartment[]> {
    return await mockDepartments;
  }

  public async getContractFormById(id?: number): Promise<ContractFormData | null> {
    if (!id) return null;

    try {
      const item = await sp.web.lists
        .getByTitle("Contract Database")
        .items.getById(id)
        .select(
          "Title",
          "ContractOwner/Id",
          "ContractOwner/Title",
          "OriginalContractOwner",
          "Department/Id",
          "Department/Title",
          "Value",
          "StartDate",
          "EndDate",
          "TypeOfContract",
          "ContractBasis",
          "AgreementNumber",
          "Vendor",
          "VendorID",
          "ArchiveLink",
          "DataProcessingAgreement",
          "LabourClause",
          "LabourClauseRiskAssessment"
        )
        .expand("ContractOwner", "Department")
        .get();

      const contractForm: ContractFormData = {
        Title: item.Title,
        ContractOwner: item.ContractOwner,
        OriginalContractOwner: item.OriginalContractOwner,
        Department: item.Department,
        Value: item.Value,
        StartDate: formatDateTimeForForm(item.StartDate),
        EndDate: formatDateTimeForForm(item.EndDate),
        TypeOfContract: item.TypeOfContract,
        ContractBasis: item.ContractBasis,
        AgreementNumber: item.AgreementNumber,
        Vendor: item.Vendor,
        VendorID: item.VendorID,
        ArchiveLink: item.ArchiveLink,
        DataProcessingAgreement: YesNoToBoolean(item.DataProcessingAgreement),
        LabourClause: YesNoToBoolean(item.LabourClause),
        LabourClauseRiskAssessment: item.LabourClauseRiskAssessment
      };

      return contractForm;
    } catch (error) {
      console.error("Error fetching contract item:", error);
      return null;
    }
  }

  public async getContractFormMock(): Promise<ContractFormData> {
    const mockdata = await mockContractFormData;
    mockdata.EndDate = formatDateTimeForForm(mockdata.EndDate)
    mockdata.StartDate = formatDateTimeForForm(mockdata.StartDate)
    return mockdata
  }
}