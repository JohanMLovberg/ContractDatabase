import * as React from 'react';
import { IViewProps } from '../../models/ContractDatabaseModel';
import './ContractDatabase.scss';
import SaveButton from '../../shared/components/SaveButton/SaveButton';
import CancelButton from '../../shared/components/CancelButton/CancelButton';
import InputField from '../../shared/components/InputField/InputField';
import DropDownField from '../../shared/components/DropDownField/DropDownField';
import DateField from '../../shared/components/DateField/DateField';
import { RadioGroupField } from '../../shared/components/RadioGroupField/RadioGroupField';
import UserPicker from '../../shared/components/userPicker/userPicker';

export default class ContractFormView extends React.Component<IViewProps, {}> {

  public render(): React.ReactElement<IViewProps> {
    return (
      <form onSubmit={this.props.onSubmit} className="formContainer">
      <div className="titleRow">
        <img 
          src={require('../../assets/titleImage.png')} 
        />
        <h1 className='title'>
          Contract
        </h1>
      </div>
        <InputField 
          name={'title'}
          value={this.props.form.title}
          label={"Title"}
          onChange={this.props.onInputChange}
          required={true}
          errors={this.props.errors.title}
        />
        <UserPicker
          value={this.props.form.contractOwner}
          label="Contract Owner"
          itemLimit={1}
          onUserSelected={(user) => this.props.onInputChange('contractOwner', user ? user.primaryText : '')}
          onResolveSuggestions={this.props.onResolveSuggestions}
          clearSelection={this.props.resetUser}
        />
        <InputField
          name={'originalContractOwner'}
          value={this.props.form.originalContractOwner}
          label={"Original Contract Owner"}
          onChange={this.props.onInputChange}
        />
        <DropDownField
          name="department"
          label="Department"
          value={this.props.form.department}
          required
          errors={this.props.errors.department}
          onChange={this.props.onInputChange}
          options={
            this.props.departments
              ? this.props.departments.map((department) => ({
                  value: department.Title,
                  label: department.Title
                }))
              : []
          }
        />
        <InputField 
          name={'value'}
          value={this.props.form.value}
          label={"Value"}
          onChange={this.props.onInputChange}
          required={true}
          errors={this.props.errors.value}
        />
        <DateField
          name="startDate"
          label="Start Date"
          value={this.props.form.startDate}
          required
          errors={this.props.errors.startDate}
          onChange={this.props.onInputChange}
        />
        <DateField
          name="endDate"
          label="End Date"
          value={this.props.form.endDate}
          required
          errors={this.props.errors.endDate}
          onChange={this.props.onInputChange}
        />
        <DropDownField
          name="typeOfContract"
          label="Type of Contract"
          value={this.props.form.typeOfContract}
          required
          errors={this.props.errors.typeOfContract}
          onChange={this.props.onInputChange}
          options={
            this.props.typeOfContract
              ? this.props.typeOfContract.map((contract) => ({
                  value: contract.label,
                  label: contract.label
                }))
              : []
          }
        />
        <DropDownField
          name="contractBasis"
          label="Contract Basis"
          value={this.props.form.contractBasis}
          onChange={this.props.onInputChange}
          options={
            this.props.contractBasis
              ? this.props.contractBasis.map((contract) => ({
                  value: contract.label,
                  label: contract.label
                }))
              : []
          }
        />
        <InputField 
          name={'agreementNumber'}
          value={this.props.form.agreementNumber}
          label={"Agreement Number"}
          onChange={this.props.onInputChange}
          underLabel={"Number if SKI/SI or name of MFA framwork agreement"}
        />
        <InputField 
          name={'vendor'}
          value={this.props.form.vendor}
          label={"Vendor"}
          onChange={this.props.onInputChange}
        />
        <InputField 
          name={'vendorId'}
          value={this.props.form.vendorId}
          label={"Vendor ID"}
          onChange={this.props.onInputChange}
          underLabel={"CVR number or VAT number"}
        />
        <InputField 
          name={'archiveLink'}
          value={this.props.form.archiveLink}
          label={"Archive Link"}
          onChange={this.props.onInputChange}
        />
        <RadioGroupField
          name="dataProcessAgreement"
          label="Data Process Agreement"
          value={this.props.form.dataProcessAgreement}
          onChange={this.props.onInputChange}
          underLabel="Does the contract contain a data process agreement?"
        />
        <RadioGroupField
          name="labourClause"
          label="Labour Clause"
          value={this.props.form.labourClause}
          onChange={this.props.onInputChange}
          underLabel="Does the contract contain a labour clause?"
        />
        <div className="formRow">
          <div className="buttonRow">
            <SaveButton/>
            <CancelButton 
              onClick={this.props.onCancel}
            />
          </div>
        </div>
          <div className="apiMessage">{this.props.apiMessage}</div>
      </form>
    );
  }
}
