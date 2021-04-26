import React from "react";
import styled from "styled-components";

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = styled.input`
  width: 200px;
  max-width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
`;

export default Input;
