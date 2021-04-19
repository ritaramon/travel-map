import React from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

const CircleButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(DefaultButton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
`;

export default CircleButton;
