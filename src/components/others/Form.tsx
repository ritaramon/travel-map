import React from "react";
import styled from "styled-components";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  ref?: React.ForwardedRef<HTMLFormElement>;
};

const Form: React.FC<Props> = React.forwardRef((props, ref) => (
  <FormField {...props} ref={ref} />
));

const FormField = styled.form<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

Form.displayName = "Form";

export default Form;
