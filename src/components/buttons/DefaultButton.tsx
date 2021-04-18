import React from "react";
import styled from "styled-components";

const DefaultButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled.button`
  width: 200px;
  height: 48px;
  text-align: center;
  padding: 8px;
  font-size: 12px;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #2b7a77;
  color: #ffffff;
  margin: 8px 0;
  &:hover {
    background-color: #308885;
  }
`;

export default DefaultButton;
