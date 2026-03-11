import * as React from "react";
import { IDateFieldProps } from "../../../models/FieldModel";

export default function DateField(props: IDateFieldProps) {
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
          className={props.className}
          type="date"
          name={props.name}
          value={props.value || ""}
          onChange={(e) =>
            props.onChange(e.target.name, e.target.value)
          }
        />

        {props.errors && (
          <div className="error">
            {props.errors}
          </div>
        )}
      </div>
    </div>
  );
}