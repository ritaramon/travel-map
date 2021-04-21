import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
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
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
            />
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
