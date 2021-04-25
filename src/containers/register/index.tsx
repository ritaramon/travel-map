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

type RegistrationErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

enum ErrorMessageText {
  email = "Invalid email format",
  password = "Password must contain a digit",
  passwordMatch = "Passwords must match",
}

const RegisterPage: React.FC = () => {
  const history = useHistory();

  const [formErrors, setFormErrors] = useState<RegistrationErrors>({});

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const email = form.email.value;
    const passwordConfirm = form.passwordConfirm.value;
    const validationErrors: RegistrationErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = ErrorMessageText.email;
    }
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/.test(password)
    ) {
      validationErrors.password = ErrorMessageText.password;
    } else if (password !== passwordConfirm) {
      validationErrors.passwordConfirm = ErrorMessageText.passwordMatch;
    }

    setFormErrors(validationErrors);
    if (validationErrors) return;

    auth
      .createUserWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        history.push("/login");
      })
      .catch((e) => console.log(e));
  };

  if (auth.currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper>
      <SectionWrapper fullHeight={true}>
        <h2>Register</h2>
        <FormWrapper>
          <Form onSubmit={handleRegisterFormSubmit}>
            <Input name="email" type="text" placeholder="Enter username" />
            <ErrorMessage>{formErrors.email}</ErrorMessage>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <ErrorMessage>{formErrors.password}</ErrorMessage>
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="Repeat password"
            />
            <ErrorMessage>{formErrors.passwordConfirm}</ErrorMessage>
            <DefaultButton>Register</DefaultButton>
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
export default RegisterPage;
