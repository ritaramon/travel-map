import styled from "styled-components";

interface Props {
  fullHeight?: boolean;
}

const SectionWrapper = styled.div<Props>`
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) => (props.fullHeight ? "height: inherit;" : "")}
`;

export default SectionWrapper;
