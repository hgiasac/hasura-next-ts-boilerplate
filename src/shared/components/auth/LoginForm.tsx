import * as React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Input } from "../general/form";
import { useI18n, useYupForm } from "../../hooks";
import { actionAuthenticate } from "../../../store/global/actions";
import { authProvider } from "../../auth";

type LoginData = {
  readonly email: string
  readonly password: string
};

type LoginFormProps = {
  readonly onSubmit: () => void
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6)
});

const LoginFormInternal: React.FunctionComponent<LoginFormProps> = ({
  onSubmit
}) => {

  const i18n = useI18n();

  const { register, handleSubmit, errors } = useYupForm<LoginData>({
    validationSchema: schema
  });

  const dispath = useDispatch();
  const onSuccess = (values: LoginData): void => {
    void authProvider.login({
      email: values.email,
      password: values.password
    }).then((user) => {
      dispath(actionAuthenticate(user));
      onSubmit();
    });

  };

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <Input
        className="textbox"
        name="email"
        type="email"
        ref={register}
        errors={errors}
        placeholder={i18n.t("general.email")}
      />
      <Input
        className="textbox"
        name="password"
        type="password"
        ref={register}
        errors={errors}
        placeholder={i18n.t("general.password")}
      />
      <input className="primary w-full" type="submit" value="Submit" />
    </form>
  );

};

export const LoginForm = LoginFormInternal;
