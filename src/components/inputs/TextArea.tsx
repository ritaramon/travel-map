import React from "react";
import styled from "styled-components";

const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  color: #2b7a77;
  resize: none;
`;

export default TextArea;
