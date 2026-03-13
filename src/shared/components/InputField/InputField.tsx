import * as React from "react";
import { IInputFieldProps } from "../../../models/FieldModel";

export default function InputField(props: IInputFieldProps): JSX.Element {
  return (
    <div className="formRow">
      <div className="formLabel">
        {props.label}
        {props.required && (
          <span className="required">*</span>
        )}
      </div>

      <div className="formControl">
        <input
          type="text"
          className={props.className}
          name={props.name}
          value={props.value}
          onChange={(ev) =>
            props.onChange(ev.target.name, ev.target.value)
          }
        />

        {props.underLabel && (
          <div>({props.underLabel})</div>
        )}

        {props.errors && (
          <div className="error">
            {props.errors}
          </div>
        )}
      </div>
    </div>
  );
}
