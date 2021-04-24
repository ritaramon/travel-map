import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    auth
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        history.push("/");
      })
      .catch((e) => console.log(e));
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
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
            />
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
