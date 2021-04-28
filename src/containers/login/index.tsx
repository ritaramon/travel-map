import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import PageWrapper from "../../components/wrappers/PageWrapper";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import LoginForm from "./LoginForm";
import globeIllustration from "../../assets/images/globeIllustration.png";

const LoginPage: React.FC = () => {
  const isTabletOrMobile: boolean = useMediaQuery({
    query: "(max-width: 768px)",
  });

  if (auth.currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <PageWrapper>
      <SectionWrapper fullHeight={true}>
        {!isTabletOrMobile ? (
          <Columns>
            <Column>
              <ImageWrapper>
                <img src={globeIllustration} />
              </ImageWrapper>
            </Column>

            <Column>
              <h1>
                Mark places on the map by <br />
                creating circles!
              </h1>
              <LoginForm />
            </Column>
          </Columns>
        ) : (
          <LoginForm />
        )}
      </SectionWrapper>
    </PageWrapper>
  );
};

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
