import * as React from "react";
import { IDropDownFieldProps } from "../../../models/FieldModel";

export default function DropDownField(props: IDropDownFieldProps): JSX.Element {
  const {
    name,
    label,
    value,
    options,
    className = "",
    required,
    errors,
    onChange
  } = props;

  return (
    <div className="formRow">
      <div className="formLabel">
        {label}
        {required && <span className="required">*</span>}
      </div>

      <div className="formControl">
        <select
          className={className}
          name={name}
          value={value}
          onChange={(ev) =>
            onChange(ev.target.name, ev.target.value)
          }
        >
          <option value="">Please select a value</option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {errors && (
          <div className="error">
            {errors}
          </div>
        )}
      </div>
    </div>
  );
}
