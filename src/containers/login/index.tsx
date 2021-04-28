import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import FormErrorMessage from "../../components/messages/FormErrorMessage";
import Form from "../../components/others/Form";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { auth } from "../../config/firebaseConfig";
import { useMediaQuery } from "react-responsive";
import globeIllustration from "../../assets/images/globeIllustration.png";
import { ValidationErrors } from "../../constants/other";
import DefaultLink from "../../components/others/DefaultLink";

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
            <h1>
              Mark places on the map by <br />
              creating circles!
            </h1>
            <FormWrapper>
              <h2>Login</h2>
              <Form onSubmit={handleLoginFormSubmit}>
                <Input name="email" type="text" placeholder="Enter email" />
                <FormErrorMessage>{loginErrors?.email}</FormErrorMessage>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <FormErrorMessage>{loginErrors?.password}</FormErrorMessage>
                <FormErrorMessage>{loginErrors?.serverError}</FormErrorMessage>
                <DefaultButton>LOGIN</DefaultButton>
                Don&apos;t have an account yet?
                <DefaultLink to="/register">Register!</DefaultLink>
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
