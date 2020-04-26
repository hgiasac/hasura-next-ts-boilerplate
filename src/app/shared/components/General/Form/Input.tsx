import * as React from "react";
import { FormControlProps, getErrorMessage } from "./util";

type InputProps = FormControlProps;
type InputComponent = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

export const Input =
  React.forwardRef<HTMLInputElement, InputComponent>(({ errors, name, ...props }, ref) => (
    <div className="mb-4">
      <div className="mb-4">
        <input ref={ref} name={name} {...props} />
      </div>
      {name && errors && errors[name] ? (
        <span className="text-error">
          {getErrorMessage(errors[name])}
        </span>
      ) : null}
    </div>
  ));

