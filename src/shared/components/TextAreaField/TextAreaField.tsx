import * as React from "react";

export interface ITextAreaFieldProps {
  name: string;
	className: string;
  value: string;
	label: string;
	underLabel?: string;
  onChange: (name: string, value: string) => void;
}

export default function TextAreaField(props: ITextAreaFieldProps) {
  return (
    <div className="field">
			<label>
				{props.label}
			</label>
			<textarea
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
    </div>
  );
}
