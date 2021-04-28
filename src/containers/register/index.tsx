import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import FormErrorMessage from "../../components/messages/FormErrorMessage";
import DefaultLink from "../../components/others/DefaultLink";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";
import { ValidationErrors } from "../../constants/other";

type RegistrationErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

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
      validationErrors.email = ValidationErrors.invalidEmail;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      validationErrors.password = ValidationErrors.invalidPassword;
    } else if (password !== passwordConfirm) {
      validationErrors.passwordConfirm = ValidationErrors.passwordsDontMatch;
    }
    setFormErrors(validationErrors);

    if (!Object.values(validationErrors).every((error) => error === "")) return;

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
        <FormWrapper>
          <h2>Sign Up</h2>
          <p>Create an account</p>
          <Form onSubmit={handleRegisterFormSubmit}>
            <Input name="email" type="text" placeholder="Enter email" />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="Repeat password"
            />
            <FormErrorMessage>{formErrors.passwordConfirm}</FormErrorMessage>
            <DefaultButton>Sign up</DefaultButton>
          </Form>
          <p>
            Already have an account?
            <DefaultLink to="/login">Sign in!</DefaultLink>
          </p>
        </FormWrapper>
      </SectionWrapper>
    </PageWrapper>
  );
};

const FormWrapper = styled.div`
  padding: 32px 16px;
  background-color: #ffffff;
  width: 500px;
  max-width: 100%;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
  text-align: center;
`;
export default RegisterPage;
