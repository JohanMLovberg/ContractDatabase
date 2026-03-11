import { IPersonaProps } from 'office-ui-fabric-react';

export interface IInputFieldProps {
  name: string;
  className?: string;
  value: string;
  label?: string;
  underLabel?: string;
  required?: boolean;
  errors?: string;
  onChange: (name: string, value: string) => void;
  searchOptions?: ISearchOptions<any>;
}

export interface ISearchOptions<T> {
  data: T[];
  field: keyof T;
  onSelect?: (item: T) => void;
}


export interface IRadioGroupFieldProps {
  name: string;
  label: string;
  value: boolean;
  required?: boolean;
  underLabel?: string;
  onChange: (name: string, value: boolean) => void;
}

export interface ICancelButtonProps {
  onClick: () => void;
}

export interface IRadioGroupFieldProps {
  name: string;
  label: string;
  value: boolean;
  required?: boolean;
  underLabel?: string;
  onChange: (name: string, value: boolean) => void;
}

export interface IRadioButtonProps {
  name: string;
  label: string;
  value: boolean;
  checkedValue: boolean;
  onChange: (name: string, value: boolean) => void;
}

export interface IDropDownFieldProps {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  errors?: string;
  onChange: (name: string, value: string) => void;
}

export interface IDateFieldProps {
  name: string;
  className?: string;
  label: string;
  value: string;
  required?: boolean;
  errors?: string;
  onChange: (name: string, value: string) => void;
}

export interface ICheckboxProps {
  name: string;
  className: string;
  label?: string;
	value: boolean;
  underLabel?: string;
  required?: boolean;
  errors?: string;
	onChange: (name: string, value: boolean) => void;
}

export interface IUserPickerProps {
  onResolveSuggestions: (filterText: string) => Promise<IPersonaProps[]>;
  value: string;
  onUserSelected?: (user: IPersonaProps | null) => void;
  itemLimit: number;
  label: string;
  required?: boolean;
  underLabel?: string;
  errors?: string;
  className?: string;
  clearSelection: boolean;
}

export interface IUserPickerState {
  selectedItems: IPersonaProps[];
}
