import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import FormErrorMessage from "../../components/messages/FormErrorMessage";
import Form from "../../components/others/Form";
import ShadowWrapper from "../../components/wrappers/ShadowWrapper";
import { auth } from "../../config/firebaseConfig";
import { ValidationErrors } from "../../constants/other";
import DefaultLink from "../../components/Links/DefaultLink";

type LoginErrors = {
  email?: string;
  password?: string;
  serverError?: string;
};

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const email = form.email.value;
    const validationErrors: LoginErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = ValidationErrors.invalidEmail;
    }
    if (!password) {
      validationErrors.password = ValidationErrors.emptyPassword;
    }
    setLoginErrors(validationErrors);

    if (!Object.values(validationErrors).every((x) => x === "")) return;

    auth
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setLoginErrors({ serverError: error.message });
      });
  };

  return (
    <ShadowWrapper>
      <h2>Login</h2>
      <Form onSubmit={handleLoginFormSubmit}>
        <Input name="email" type="text" placeholder="Enter email" />
        <FormErrorMessage>{loginErrors?.email}</FormErrorMessage>
        <Input name="password" type="password" placeholder="Enter password" />
        <FormErrorMessage>{loginErrors?.password}</FormErrorMessage>
        <FormErrorMessage>{loginErrors?.serverError}</FormErrorMessage>
        <DefaultButton>LOGIN</DefaultButton>
        Don&apos;t have an account yet?
        <DefaultLink to="/register">Register!</DefaultLink>
      </Form>
    </ShadowWrapper>
  );
};

export default LoginForm;
