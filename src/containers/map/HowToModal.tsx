import React, { useState } from "react";
import ReactModal from "react-modal";
import CloseButton from "../../components/buttons/CloseButton";
import styled from "styled-components";
import howToDraw from "../../assets/images/howToDraw.png";
const HowToModal: React.FC = () => {
  const [isVisible, setModalVisibility] = useState(true);
  ReactModal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      backgroundColor: "#f5f6f6",
      width: "100%",
      maxWidth: "600px",
      boxShadow: "0 0 20px 0 rgb(0 0 0 / 15%)",
      maxHeight: "calc(100vh - 16px)",
      overflow: "auto",
    },
    overlay: { zIndex: 4 },
  };

  const handleClose = () => {
    localStorage.setItem("howToModal", "hidden");
    setModalVisibility(false);
  };

  return (
    <ReactModal isOpen={isVisible} style={customStyles}>
      <ContentWrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={() => handleClose()} />
        </CloseButtonWrapper>
        <h2>Hello there!</h2>
        <p>
          This is a quick help on how to mark places in the map.
          <br />
          Select the circle in top left corner and start drawing:
        </p>
        <img src={howToDraw} width="100%" alt="" />
      </ContentWrapper>
    </ReactModal>
  );
};

const ContentWrapper = styled.div`
  text-align: center;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export default HowToModal;
