import React from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

const RedButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(DefaultButton)`
  background-color: #d64933;
  &:hover {
    background-color: #da5844;
  }
`;

export default RedButton;
