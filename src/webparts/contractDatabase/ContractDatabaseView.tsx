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
import { 
  ContractBasis,
  LabourClauseRiskAssessment,
  TypeOfContract 
} from '../../utils/consts/DropDownConsts';

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
          name={'Title'}
          value={this.props.form.Title}
          label={"Title"}
          onChange={this.props.onInputChange}
          required={true}
          errors={this.props.errors.title}
        />
        <UserPicker
          value={this.props.form.ContractOwner}
          label="Contract Owner"
          itemLimit={1}
          onUserSelected={(user) => this.props.onInputChange('contractOwner', user ? user.primaryText : '')}
          onResolveSuggestions={this.props.onResolveSuggestions}
          clearSelection={this.props.resetUser}
        />
        <InputField
          name={'OriginalContractOwner'}
          value={this.props.form.OriginalContractOwner}
          label={"Original Contract Owner"}
          onChange={this.props.onInputChange}
        />
        <DropDownField
          name="Department"
          label="Department"
          value={this.props.form.Department}
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
          name={'Value'}
          value={this.props.form.Value}
          label={"Value"}
          onChange={this.props.onInputChange}
          required={true}
          errors={this.props.errors.value}
        />
        <DateField
          name="StartDate"
          label="Start Date"
          value={this.props.form.StartDate}
          required
          errors={this.props.errors.startDate}
          onChange={this.props.onInputChange}
        />
        <DateField
          name="EndDate"
          label="End Date"
          value={this.props.form.EndDate}
          required
          errors={this.props.errors.endDate}
          onChange={this.props.onInputChange}
        />
        <DropDownField
          name="TypeOfContract"
          label="Type of Contract"
          value={this.props.form.TypeOfContract}
          required
          errors={this.props.errors.typeOfContract}
          onChange={this.props.onInputChange}
          options={TypeOfContract}
        />
        <DropDownField
          name="ContractBasis"
          label="Contract Basis"
          value={this.props.form.ContractBasis}
          onChange={this.props.onInputChange}
          options={ContractBasis}
        />
        <InputField
          name={'AgreementNumber'}
          value={this.props.form.AgreementNumber}
          label={"Agreement Number"}
          onChange={this.props.onInputChange}
          underLabel={"Number if SKI/SI or name of MFA framwork agreement"}
        />
        <InputField
          name={'Vendor'}
          value={this.props.form.Vendor}
          label={"Vendor"}
          onChange={this.props.onInputChange}
        />
        <InputField
          name={'VendorID'}
          value={this.props.form.VendorID}
          label={"Vendor ID"}
          onChange={this.props.onInputChange}
          underLabel={"CVR number or VAT number"}
        />
        <InputField
          name={'ArchiveLink'}
          value={this.props.form.ArchiveLink}
          label={"Archive Link"}
          onChange={this.props.onInputChange}
        />
        <RadioGroupField
          name="DataProcessingAgreement"
          label="Data Process Agreement"
          value={this.props.form.DataProcessingAgreement}
          onChange={this.props.onInputChange}
          underLabel="Does the contract contain a data process agreement?"
        />
        <RadioGroupField
          name="LabourClause"
          label="Labour Clause"
          value={this.props.form.LabourClause}
          onChange={this.props.onInputChange}
          underLabel="Does the contract contain a labour clause?"
        />
        {this.props.form.LabourClause === true && (
          <DropDownField
            name="LabourClauseRiskAssessment"
            label="If Labour Clause is Yes"
            required={true}
            value={this.props.form.LabourClauseRiskAssessment}
            onChange={this.props.onInputChange}
            errors={this.props.errors.LabourClauseRiskAssessment}
            options={LabourClauseRiskAssessment}
          />
        )}
        <div className="formRow">
          <div className="buttonRow">
            <SaveButton />
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
