import { IInputFieldProps } from "../../../models/FieldModel";

export interface IInputFieldState {
  results: any[];
  showAll: boolean;
}

export class InputFieldLogic {
  props: IInputFieldProps;
  state: IInputFieldState;
  setState: (state: (prevState: IInputFieldState, props: IInputFieldProps) => IInputFieldState) => void;

  constructor(
    props: IInputFieldProps,
    setState: (state: (prevState: IInputFieldState, props: IInputFieldProps) => IInputFieldState) => void
  ) {
    this.props = props;
    this.setState = setState;
    this.state = {
      results: [],
      showAll: false
    };
  }

  handleChange(value: string): void {
    this.props.onChange(this.props.name, value);

    if (this.props.searchOptions) {
      const data = this.props.searchOptions.data;
      const field = this.props.searchOptions.field;

      const matches = data.filter(item => {
        const v = item[field];
        return typeof v === "string" && v.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });

      this.setState((prevState) => ({
        results: matches,
        showAll: false
      }));
    }
  }

  handleSelect(item: any): void {
    if (this.props.searchOptions) {
      const field = this.props.searchOptions.field;
      this.props.onChange(this.props.name, item[field]);

      if (this.props.searchOptions.onSelect) {
        this.props.searchOptions.onSelect(item);
      }

      this.setState(() => ({
        results: [],
        showAll: false
      }));
    }
  }

  toggleShowAll(): void {
    this.setState((prevState) => ({
      results: prevState.results,
      showAll: !prevState.showAll
    }));
  }
}