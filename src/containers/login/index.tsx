import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import ErrorMessage from "../../components/messages/ErrorMessage";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";

type LoginErrors = {
  email?: string;
  password?: string;
  serverError?: string;
};

const LoginPage: React.FC = () => {
  const history = useHistory();

  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const email = form.email.value;
    const validationErrors: LoginErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!password) {
      validationErrors.password = "Please enter a password";
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

  if (auth.currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <PageWrapper>
      <SectionWrapper fullHeight={true}>
        <h2>Login</h2>
        <FormWrapper>
          <Form onSubmit={handleLoginFormSubmit}>
            <Input name="email" type="text" placeholder="Enter email" />
            <ErrorMessage>{loginErrors?.email}</ErrorMessage>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorMessage>{loginErrors?.password}</ErrorMessage>
            <ErrorMessage>{loginErrors?.serverError}</ErrorMessage>
            <DefaultButton>LOGIN</DefaultButton>
            Do not have an account yet? Register!
          </Form>
        </FormWrapper>
      </SectionWrapper>
    </PageWrapper>
  );
};

const FormWrapper = styled.div`
  padding: 32px 16px;
  background-color: #f5f6f6;
  width: 500px;
  max-width: 100%;
`;
export default LoginPage;
