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
  background: #f5f6f6;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
  -moz-box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
  z-index: 3;
  position: relative;
`;

export default Header;
