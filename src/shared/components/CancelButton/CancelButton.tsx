import * as React from "react";
import './CancelButton.scss';
import { ICancelButtonProps } from "../../../models/FieldModel";

export default function CancelButton(props: ICancelButtonProps) {
  return (
    <button
      type="button"
      className="secondaryButton"
      onClick={props.onClick}
    >
      Cancel
    </button>
  );
}
