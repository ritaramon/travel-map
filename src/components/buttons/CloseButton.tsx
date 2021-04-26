import React from "react";
import styled from "styled-components";
import CircleButton from "./ToggleButton";
import closeIcon from "../../assets/icons/closeIcon.png";

const CloseButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(CircleButton)`
  background-color: #dfe2e2;
  width: 24px;
  height: 24px;
  background-image: url(${closeIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  &:hover {
    background-color: #dfe2e2;
  }
`;

export default CloseButton;
