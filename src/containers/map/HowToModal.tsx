import React, { useState } from "react";
import howToDraw from "../../assets/images/howToDraw.png";
import Modal from "../../components/others/Modal";
const HowToModal: React.FC = () => {
  const [isVisible, setModalVisibility] = useState(true);

  const handleClose = () => {
    localStorage.setItem("howToModal", "hidden");
    setModalVisibility(false);
  };

  return (
    <Modal isOpen={isVisible} onClose={handleClose}>
      <h2>Hello there!</h2>
      <p>
        This is a quick help on how to mark places in the map.
        <br />
        Select the circle in top left corner and start drawing:
      </p>
      <img src={howToDraw} width="100%" alt="" />
    </Modal>
  );
};

export default HowToModal;
