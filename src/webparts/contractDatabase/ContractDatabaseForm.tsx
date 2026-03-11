import * as React from "react";
import {
  IContractFormState,
  IContractFormProps
} from "../../models/ContractDatabaseModel";
import ContractFormView from "./ContractDatabaseView";
import { ContractFormLogic } from "./ContractDatabaseLogic";

export default class ContractDataBaseForm extends React.Component<
  IContractFormProps,
  IContractFormState
> {

  private logic = new ContractFormLogic();

  constructor(props: IContractFormProps) {
    super(props);

    this.state = {
      form: this.logic.createEmptyForm(),
      errors: {},
      departments: [],
      typeOfContract: [],
      contractBasis: [],
      resetUser: false
    };
  }

  public async componentDidMount() {
    const [departments, typeOfContract, contractBasis] = await Promise.all([
      this.logic.getDepartments(),
      this.logic.getTypeOfContract(),
      this.logic.getContractBasis()
    ]);

    this.setState({
      departments: departments,
      typeOfContract: typeOfContract,
      contractBasis: contractBasis,
    });

    const prefilledData = await this.logic.getContractForm();    
    this.convertPrefilledData(prefilledData);
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
    const response = await this.logic.submit(this.state.form);

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
  
  public render() {
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