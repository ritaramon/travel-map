import React from "react";
import styled from "styled-components";
import CircleButton from "../../components/buttons/ToggleButton";
import { actions } from "../../state/actions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../config/firebaseConfig";
import { useHistory } from "react-router-dom";
import HeaderLink from "../../components/Links/HeaderLink";
import settingsIcon from "../../assets/icons/settingsIcon.png";
import { AppState } from "../../state/reducers";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedCircleId = useSelector(
    (state: AppState) => state.circlesData.selectedCircleId
  );

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/login");
      })
      .catch((e) => console.log(e));
  };
  return (
    <StyledHeader>
      {selectedCircleId && (
        <CircleButton
          onClick={() => dispatch(actions.app.setSidebarVisibility())}
        ></CircleButton>
      )}

      <LinkWrapper>
        <HeaderLink
          to="#"
          onClick={() => dispatch(actions.app.displayCategoryModal())}
        >
          <img src={settingsIcon} /> Categories
        </HeaderLink>
        <HeaderLink to="#" onClick={handleLogOut}>
          Log out
        </HeaderLink>
      </LinkWrapper>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: #f5f6f6;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
  z-index: 3;
  position: relative;
`;

const LinkWrapper = styled.div`
  margin-left: auto;
`;

export default Header;
