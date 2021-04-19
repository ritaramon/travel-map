import React from "react";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";

const LoginPage: React.FC = () => {
  return (
    <PageWrapper>
      <SectionWrapper fullHeight={true}>
        <h2>Login</h2>
        <FormWrapper>
          <Form>
            <Input type="email" placeholder="Enter email"></Input>
            <Input type="password" placeholder="Enter password"></Input>
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
