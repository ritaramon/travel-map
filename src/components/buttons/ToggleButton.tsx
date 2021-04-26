import React from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import toggleIcon from "../../assets/icons/toggleIcon.png";

const CircleButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(DefaultButton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0;
  background-image: url(${toggleIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
`;

export default CircleButton;
