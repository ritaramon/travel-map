import React from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

const RedButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(DefaultButton)`
  background-color: #e63946;
  &:hover {
    background-color: #e94957;
  }
`;

export default RedButton;
