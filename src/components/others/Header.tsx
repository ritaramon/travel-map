import React from "react";
import styled from "styled-components";
import CircleButton from "../buttons/CircleButton";
import { toggleSidebar } from "../../state/actions";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <StyledHeader>
      <CircleButton onClick={() => dispatch(toggleSidebar())}></CircleButton>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: #d6d6d6;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  box-display: border-box;
`;

export default Header;
