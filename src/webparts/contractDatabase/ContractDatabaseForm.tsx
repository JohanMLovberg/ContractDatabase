import * as React from "react";
import {
  IContractFormState,
  IContractFormProps
} from "../../models/ContractDatabaseModel";
import ContractFormView from "./ContractDatabaseView";
import { ContractFormLogic } from "./ContractDatabaseLogic";
import { APIResponse } from "../../models/ApiModel";

export default class ContractDataBaseForm extends React.Component<
  IContractFormProps,
  IContractFormState
> {
  private logic: ContractFormLogic;
  private id = undefined;

  constructor(props: IContractFormProps) {
    super(props);

    this.logic = new ContractFormLogic(this.props.context);

    this.state = {
      form: this.logic.createEmptyForm(),
      errors: {},
      departments: [],
      typeOfContract: [],
      contractBasis: [],
      resetUser: false
    };
  }
  
  public async componentDidMount(): Promise<void> {
    const [departments ] = await Promise.all([
      this.logic.getDepartments(),
    ]);

    this.setState({
      departments: departments,
    });

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("itemID");
    this.id = idParam ? parseInt(idParam, 10) : undefined;

    if (this.id !== undefined) { 
      const prefilledData = await this.logic.getContractForm(this.id); 
      this.convertPrefilledData(prefilledData);
    }
  }

  private handleInputChange = (name: string, value: any) => {
    if (name === "Department") {
      this.handleDepartmentInput(value);

    } else if (name === "LabourClause" && value === false) {
      this.handleLabourClauseInput();

    } else {
      const updatedForm = this.logic.updateField(this.state.form, name, value);
      const { [name]: removed, ...updatedErrors } = this.state.errors;

        this.setState({
        form: updatedForm,
        errors: updatedErrors
      });
    }
  };

  private handleDepartmentInput(value: Number): void {
    const departmentValue = Number(value);
    const departmentArray = this.state.departments.filter(function(d) {
      return d.Id === departmentValue;
    });
    const department = departmentArray.length > 0 ? departmentArray[0] : { Id: null, Title: "" };
    this.setState(prev => ({
      form: {
        ...prev.form,
        Department: department
      }
    }));
  }

  private handleLabourClauseInput(): void {
    this.setState(prev => ({
      form: {
        ...prev.form,
        LabourClause: false,
        LabourClauseRiskAssessment: ''
      }
    }));
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = this.logic.validate(this.state.form);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    let response: APIResponse;

    if (this.id !== undefined) { 
      response = await this.logic.submit(this.state.form);
    } else {
      console.log(this.state.form);
      response = await this.logic.editForm(this.state.form, this.id);
    }

    if (response.success) {
      this.setState({
        form: this.logic.createEmptyForm(),
        errors: {},
        apiMessage: response.message,
        resetUser: !this.state.resetUser
      });
      this.logic.redirectToSource();
    } else {
      this.setState({
        apiMessage: response.message
      });
    }
  };

  private handleCancel = () => {
    this.logic.redirectToSource();
  };

  private handleResolveUserSuggestions = async (filterText: string) => {
    return await this.logic.getUsers(filterText);
  };

  private convertPrefilledData(data): void {
    this.setState({
      form: data
    });
  }
  
  public render(): JSX.Element {
    return (
      <ContractFormView
        form={this.state.form}
        errors={this.state.errors}
        departments={this.state.departments}
        typeOfContract={this.state.typeOfContract}
        contractBasis={this.state.contractBasis}
        apiMessage={this.state.apiMessage}
        onInputChange={this.handleInputChange}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        onResolveSuggestions={this.handleResolveUserSuggestions}
        resetUser={this.state.resetUser}
      />
    );
  }
}