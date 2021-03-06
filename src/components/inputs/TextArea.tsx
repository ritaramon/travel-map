import React from "react";
import styled from "styled-components";

const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #dfe2e2;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  resize: none;
`;

export default TextArea;
