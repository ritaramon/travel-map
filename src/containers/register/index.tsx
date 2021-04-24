import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import ErrorMessage from "../../components/messages/ErrorMessage";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";

const RegisterPage: React.FC = () => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  console.log(formErrors);
  const history = useHistory();
  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const email = form.email.value;
    const validationErrors = {
      email: "",
      password: "",
    };
    if (password.length < 6) {
      validationErrors.password = "ust be at least 6 characters long";
    } else if (!/\d/.test(password)) {
      validationErrors.password = "Password must contain a digit";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }
    setFormErrors(validationErrors);

    auth
      .createUserWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        history.push("/login");
      })
      .catch((e) => console.log(e));
  };

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
              name="password-confirm"
              type="password"
              placeholder="Repeat password"
            />
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
