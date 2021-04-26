import React from "react";
import styled from "styled-components";
import ToggleButton from "./ToggleButton";
import deleteIcon from "../../assets/icons/deleteIcon.png";

const DeleteButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled(ToggleButton)`
  background-color: #d64933;
  background-image: url(${deleteIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px;
  &:hover {
    background-color: #da5844;
  }
`;

export default DeleteButton;
