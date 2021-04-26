import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import ErrorMessage from "../../components/messages/ErrorMessage";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";
import { useMediaQuery } from "react-responsive";
import globeIllustration from "../../assets/images/globeIllustration.png";
import { ErrorsTexts } from "../../constants/other";

type LoginErrors = {
  email?: string;
  password?: string;
  serverError?: string;
};

const LoginPage: React.FC = () => {
  const history = useHistory();

  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const isTabletOrMobile: boolean = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const email = form.email.value;
    const validationErrors: LoginErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = ErrorsTexts.invalidEmail;
    }
    if (!password) {
      validationErrors.password = ErrorsTexts.emptyPassword;
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
        <Columns>
          {!isTabletOrMobile && (
            <Column>
              <ImageWrapper>
                <img src={globeIllustration} />
              </ImageWrapper>
            </Column>
          )}
          <Column>
            <FormWrapper>
              <h2>Login</h2>
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
                Don&apos;t have an account yet?
                <Link to="/register">Register!</Link>
              </Form>
            </FormWrapper>
          </Column>
        </Columns>
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

const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;
  img {
    width: 60%;
    max-width: 650px;
  }
`;

const Column = styled.div`
  flex: 1 1 0;
`;

const Columns = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export default LoginPage;
