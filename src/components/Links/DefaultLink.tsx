import { Link } from "react-router-dom";
import styled from "styled-components";

const DefaultLink = styled(Link)`
  margin: 8px;
  text-decoration: none;
  color: #0077b6;
  &:hover {
    opacity: 0.8;
  }
`;

export default DefaultLink;
