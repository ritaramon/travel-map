import React from "react";
import ReactModal from "react-modal";
import CloseButton from "../../components/buttons/CloseButton";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <ContentWrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={() => onClose()} />
        </CloseButtonWrapper>
        {children}
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

export default Modal;
