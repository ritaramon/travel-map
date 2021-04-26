import React from "react";
import styled from "styled-components";

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = styled.input`
  width: 200px;
  max-width: 100%;
  padding: 8px;
  margin: 8px 0;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #dfe2e2;
  outline: none;
  font-size: 14px;
  font-family: "Roboto";
  &:focus {
    background-color: #f5f6f6;
  }
`;

export default Input;
