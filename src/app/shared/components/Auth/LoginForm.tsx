import * as React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../General/Form";
import { useI18n } from "../../i18n";

type LoginFormProps = {};

const LoginFormInternal: React.FunctionComponent<LoginFormProps> = () => {

  const i18n = useI18n();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data): void => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="textbox"
        name="email"
        type="email"
        ref={register({ required: true })}
        errors={errors}
        placeholder={i18n.t("general.email")}
      />
      <Input
        className="textbox"
        name="password"
        type="password"
        ref={register({ required: true })}
        errors={errors}
        placeholder={i18n.t("general.password")}
      />
      <input className="primary w-full" type="submit" value="Submit" />
    </form>
  );

};

export const LoginForm = LoginFormInternal;
