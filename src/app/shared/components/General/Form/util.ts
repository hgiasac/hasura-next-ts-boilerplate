import { NestDataObject, FieldError } from "react-hook-form";

export type FormErrors = NestDataObject<Record<string, any>, FieldError>;
export type FormControlProps = {
  readonly errors?: FormErrors
};

export const getErrorMessage: (field: FieldError) => string = (field) => {
  if (field.message) {
    return field.message.toString();
  }

  const name = field.ref?.name;

  if (name) {
    return `${name} is ${field.type}`;
  }

  return "";
};
