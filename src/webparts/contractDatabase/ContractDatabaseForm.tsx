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
    const updatedForm = this.logic.updateField(this.state.form, name, value);
    const { [name]: removed, ...updatedErrors } = this.state.errors;

    this.setState({
      form: updatedForm,
      errors: updatedErrors
    });
  };

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
      response = await this.logic.editForm(this.state.form, this.id);
    }

    if (response.success) {
      this.setState({
        form: this.logic.createEmptyForm(),
        errors: {},
        apiMessage: response.message,
        resetUser: !this.state.resetUser
      });
    } else {
      this.setState({
        apiMessage: response.message
      });
    }
  };

  private handleCancel = () => {
    this.setState({
      form: this.logic.createEmptyForm(),
      errors: {},
      apiMessage: "",
      resetUser: !this.state.resetUser
    });
  };

  private handleResolveUserSuggestions = async (filterText: string) => {
    return await this.logic.getUsers(filterText);
  };

  private convertPrefilledData(data) {
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