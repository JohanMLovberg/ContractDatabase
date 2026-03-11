import * as React from "react";
import { ICheckboxProps } from "../../../models/FieldModel";


export default function Checkbox(props: ICheckboxProps) {
  return (
    <div className="field">
      <label>
        {props.label}
      {props.required && (
        <span className="required">*</span>
      )}
      </label>

      <input
        type="checkbox"
        id={props.name}
        className={props.className}
        name={props.name}
        checked={props.value}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange(ev.target.name, ev.target.checked)
        }
      />

      {props.underLabel && (
        <div>{props.underLabel}</div>
      )}
      {props.errors && (
        <div className="error">
          {props.errors}
        </div>
      )}
    </div>
  );
}