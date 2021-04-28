import React from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  loading: boolean;
};

const Loader: React.FC<Props> = ({ loading }) => (
  <LoaderWrapper>
    <ClipLoader color="#759593" loading={loading} size={48} />
  </LoaderWrapper>
);

const LoaderWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
`;

export default Loader;
