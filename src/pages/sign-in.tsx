import type { NextPage } from "next";
import { useCallback } from "react";
import { signIn } from "next-auth/react";

import { loginSchema, ILogin } from "@/common/validation/auth";
import Heading from "@/web/components/system/Heading";
import { Form, Formik } from "formik";
import FormErrorMessages from "@/web/components/system/FormErrorMessages";
import FormFieldEmail from "@/web/components/business/FormFieldEmail";
import FormFieldPassword from "@/web/components/business/FormFieldPassword";
import SubmitButton from "@/web/components/system/SubmitButton";
import LinkButton from "@/web/components/system/LinkButton";
import SmallLayout from "@/web/components/system/SmallLayout";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
  const { query } = useRouter();
  const handleSubmit = useCallback(async (values: ILogin) => {
    await signIn("credentials", { ...values, callbackUrl: "/" });
  }, []);
  const credentialsError = query.error as string;
  const errorMessage = credentialsError
    ? ["Your e-mail or password are incorrect."]
    : null;

  return (
    <SmallLayout withLogo title="Sign In">
      <Heading size="md" className="mb-6 text-center">
        Sign in to your account
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <FormErrorMessages errors={errorMessage} />
          <FormFieldEmail name="email" />
          <FormFieldPassword name="password" />
          <SubmitButton full>Sign in</SubmitButton>
          <LinkButton href="/forgot-password" variant="link">
            Forgot password
          </LinkButton>
        </Form>
      </Formik>
    </SmallLayout>
  );
};

export default SignInPage;
