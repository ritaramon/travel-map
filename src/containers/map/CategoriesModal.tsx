import React, { useState } from "react";
import ReactModal from "react-modal";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import ColorPicker from "../../components/others/ColorPicker";
import ErrorMessage from "../../components/messages/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryRequest, displayCategoryModal } from "../../state/actions";
import CategoriesTable from "./CategoriesTable";
import CloseButton from "../../components/buttons/CloseButton";
import styled from "styled-components";
import { ErrorsTexts } from "../../constants/other";
import { AppState } from "../../state/reducers";

const CategoriesModal: React.FC = () => {
  ReactModal.setAppElement("#root");
  const dispatch = useDispatch();

  const [categoryColor, setCategoryColor] = useState("#7BDCB5");
  const [formError, setFormError] = useState("");
  const isModalVisible = useSelector(
    (state: AppState) => state.appData.isCategoryModalVisible
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const categoryName: string = form.category.value.trim();
    if (!categoryName) {
      setFormError(ErrorsTexts.categoryEmpty);
      return;
    } else {
      setFormError("");
    }
    dispatch(addCategoryRequest({ name: categoryName, color: categoryColor }));
    form.reset();
  };

  return (
    <ReactModal isOpen={isModalVisible} style={customStyles}>
      <ContentWrapper>
        <CloseButtonWrapper>
          <CloseButton onClick={() => dispatch(displayCategoryModal())} />
        </CloseButtonWrapper>
        <h2>Categories</h2>
        <p>
          If you want to add category, select a color you want and add a name!
        </p>
        <Form onSubmit={handleSubmit}>
          <ColorPicker
            onColorChange={(color) => setCategoryColor(color)}
            defaultColor={categoryColor}
          />
          <Input
            name="category"
            placeholder="Add category name..."
            maxLength={25}
          />
          <DefaultButton>Add</DefaultButton>
          <ErrorMessage>{formError}</ErrorMessage>
        </Form>
        <CategoriesTable />
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

export default CategoriesModal;
