import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};
const ErroMessage: React.FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.span`
  color: red;
`;

export default ErroMessage;
