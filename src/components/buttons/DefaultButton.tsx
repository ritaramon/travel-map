import React from "react";
import styled from "styled-components";

const DefaultButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = styled.button`
  width: 200px;
  height: 48px;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  letter-spacing: 2px;
  outline: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  background-color: #678786;
  text-transform: uppercase;
  color: #ffffff;
  margin: 16px 0;
  &:hover {
    background-color: #759593;
  }
`;

export default DefaultButton;
