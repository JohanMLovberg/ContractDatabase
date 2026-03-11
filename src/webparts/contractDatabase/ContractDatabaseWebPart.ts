import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import ContractDataBaseForm from './ContractDatabaseForm';
import { IContractFormProps } from '../../models/ContractDatabaseModel';

export default class ContractDatabaseWebPart extends BaseClientSideWebPart<IContractFormProps> {

  public render(): void {
    this.renderReactComponent<IContractFormProps>(
      this.domElement,
      ContractDataBaseForm,
      { description: this.properties.description }
    );
  }
  private renderReactComponent<T>(
    domElement: HTMLElement,
    Component: React.ComponentType<T>,
    props: T
  ): void {
    const element = React.createElement(Component, props);
    ReactDom.render(element, domElement);
  }
}
