import * as React from "react";
import { FormControlProps } from "./util";
import { ErrorMessage } from "./Message";

type InputProps = FormControlProps;
type InputComponent = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

export const Input =
  React.forwardRef<HTMLInputElement, InputComponent>(({ errors, name, type, ...props }, ref) => (
    <div className="mb-4">
      <div className="mb-2">
        <input ref={ref} name={name} type={type || "text"} {...props} />
      </div>
      {name && errors && errors[name] ? (
        <ErrorMessage message={errors[name]} />
      ) : null}
    </div>
  ));

