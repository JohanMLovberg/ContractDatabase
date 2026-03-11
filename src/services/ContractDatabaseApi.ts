import { APIResponse } from "../models/ApiModel";
import BaseApi from "./BaseApi";
import { PeoplePickerEntity, sp, PeoplePickerEntityData } from 'sp-pnp-js';
import { SPpeople } from "../mock/people";
import { IDepartment, mockDepartments } from "../mock/departments";
import { ContractFormData } from "../models/ContractDatabaseModel";
import { ITypeOfContract, mockTypeOfContract } from "../mock/TypeOfContract";
import { IContractBasis, mockContractBasis } from "../mock/contractBasis";
import { mockContractFormData } from "../mock/PreMadeFormData";

export default class ContractDatabaseApi extends BaseApi {
  
  public async submitContractDatabase(
    formData: ContractFormData
  ): Promise<APIResponse> {
    console.log(formData);
    return this.handleRequest(() => this.apiClient.get('/posts'));
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

  public async getTypeOfContractList(): Promise<ITypeOfContract[]> {
    const allLists = await sp.web.lists.select("Label", "Value").get();
    const typeOfContractList = allLists.find(l => l.Title === "TypeOfContract");
    if (!typeOfContractList) return [];

    let items: ITypeOfContract[] = await sp.web.lists.getById(typeOfContractList.Id).items.get();
    return items;
  }

  public async getTypeOfContractListMock(): Promise<ITypeOfContract[]> {
    return await mockTypeOfContract;
  }

  public async getContractBasisList(): Promise<IContractBasis[]> {
    const allLists = await sp.web.lists.select("Label", "Value").get();
    const contractBasisList = allLists.find(l => l.Title === "ContractBasis");
    if (!contractBasisList) return [];

    let items: IContractBasis[] = await sp.web.lists.getById(contractBasisList.Id).items.get();
    return items;
  }

  public async getContractBasisListMock(): Promise<IContractBasis[]> {
    return await mockContractBasis;
  }

  public async getContractFormMock(): Promise<ContractFormData> {
    return await mockContractFormData;
  }
}