import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};
const ErroMessage: React.FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.span`
  color: #ea1601;
  font-size: 14px;
`;

export default ErroMessage;
