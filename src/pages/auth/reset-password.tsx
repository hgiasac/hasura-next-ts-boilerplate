import * as React from "react";
import * as yup from "yup";
import { Layout } from "../../shared/components/layout/Layout";
import { useI18n, useUser, useYupForm } from "../../shared/hooks";
import { Input, ErrorMessage } from "../../shared/components/general/form";
import { withAuthProvider } from "../../shared/auth";
import { I18nProps } from "../../shared/types";
import { Config } from "../../shared/config";
import { auth } from "firebase";

type ResetPasswordValues = {
  readonly email: string
};

const schema = yup.object().shape({
  email: yup.string().email().required()
});

type ResetPasswordSuccessProps = ResetPasswordValues & I18nProps;

const ResetPasswordSuccess: React.FunctionComponent<ResetPasswordSuccessProps> =
  ({ email, i18n }) => (
    <div>{i18n.t("message.resetPasswordSuccess", {
      email,
      expiry: Config.resetPasswordExpiry
    })}</div>
  );

const ResetPassword = (): JSX.Element | null => {

  const titleKey = "pageTitle.resetPassword";
  const i18n = useI18n();
  const user = useUser();

  const [submitting, setSubmitting] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { register, handleSubmit, errors } = useYupForm<ResetPasswordValues>({
    validationSchema: schema
  });

  const onSubmit = ({ email }: ResetPasswordValues): void => {
    setSubmitting(true);
    withAuthProvider().sendPasswordResetEmail(email)
      .then(() => {
        setSubmitting(false);
        setEmailSent(email);
      }).catch((err: auth.Error) => {
        setSubmitting(false);

        switch (err.code) {
          case "auth/user-not-found":
            setErrorMessage(i18n.t("messsage.emailNotFound"));
            break;
          default:
            setErrorMessage(err.message);
        }
      });
  };

  const FormElement = (): JSX.Element => (
    <div>
      <h1 className="mb-4">
        {i18n.t(titleKey)}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="textbox"
          name="email"
          type="email"
          ref={register}
          errors={errors}
          placeholder={i18n.t("general.email")}
          disabled={submitting}
        />
        <input className="primary w-full"
          type="submit"
          value="Submit"
          disabled={submitting}
        />
      </form>
      {errorMessage ? (
        <div className="mt-2">
          <ErrorMessage message={errorMessage} />
        </div>
      ) : ""}
    </div>
  );

  return !user ? (
    <Layout title={i18n.t(titleKey)}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 px-4">
          {emailSent
            ? <ResetPasswordSuccess email={emailSent} i18n={i18n} />
            : <FormElement />}

        </div>
      </div>
    </Layout>
  ) : null;
};

export default ResetPassword;
