import * as React from 'react';
import { CompactPeoplePicker, IPersonaProps } from 'office-ui-fabric-react';
import './userPicker.scss';
import { IUserPickerProps, IUserPickerState } from '../../../models/FieldModel';
import HoverCard from '../HoverCard/HoverCard';

export default class UserPicker extends React.Component<IUserPickerProps, IUserPickerState> {
  constructor(props: IUserPickerProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

	public componentDidUpdate(prevProps: IUserPickerProps): void {
    if (this.props.clearSelection !== prevProps.clearSelection && this.props.clearSelection) {
      this.clearSelection();
    }
		if (
			this.props.value !== prevProps.value ||
			this.props.keyValue !== prevProps.keyValue
		) {
			if (this.props.value && this.props.keyValue) {
			const current = this.state.selectedItems[0];
			if (!current || current.optionalText !== this.props.keyValue) {
				this.setState({
				selectedItems: [{
					key: this.props.keyValue,
					primaryText: this.props.value,
					optionalText: this.props.keyValue
				} as IPersonaProps]
				});
			}
			}
		}
	}
	
	private _onChange = (items?: IPersonaProps[]): void => {
		const safeItems = items ? items : [];
		const selected = safeItems.length ? safeItems[0] : null;

		this.setState({ selectedItems: safeItems });

  if (this.props.onUserSelected) {
    this.props.onUserSelected(
      selected
        ? { id: selected.optionalText, name: selected.primaryText }
        : { id: null, name: "" }
    );
  }
};

  private clearSelection(): void {
    this.setState({ selectedItems: [] });
  }

	public render(): React.ReactElement<IUserPickerProps> {
    return (
      <div className="formRow">
        {this.props.label && (
          <div className="formLabel">
            {this.props.label}
			{this.props.required && 
				<span className="required">*</span>
			}
          </div>
        )}
        <div className="formControl">
					<CompactPeoplePicker
						className="userPicker"
						onResolveSuggestions={this.props.onResolveSuggestions}
						selectedItems={this.state.selectedItems}
						itemLimit={this.props.itemLimit}
						onChange={this._onChange}
							onRenderSuggestionsItem={(item: IPersonaProps) => {
								return (
									<div className="suggestionItemWrapper">
										<HoverCard item={item}>
											<div className="suggestionItemContent">
												{item.primaryText}
											</div>
										</HoverCard>

										{item.secondaryText && (
											<div>
												{item.secondaryText}
											</div>
										)}
									</div>
								);
							}}
					/>
          {this.props.underLabel && <div>({this.props.underLabel})</div>}
          {this.props.errors && <div className="error">{this.props.errors}</div>}
        </div>
      </div>
    );
  }
}