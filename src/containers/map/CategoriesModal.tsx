import React, { useState } from "react";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import ColorPicker from "../../components/others/ColorPicker";
import FormErrorMessage from "../../components/messages/FormErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../state/actions";
import CategoriesTable from "./CategoriesTable";
import { ValidationErrors } from "../../constants/other";
import { AppState } from "../../state/reducers";
import Modal from "../../components/others/Modal";

const CategoriesModal: React.FC = () => {
  const dispatch = useDispatch();

  const [categoryColor, setCategoryColor] = useState("#7BDCB5");
  const [formError, setFormError] = useState("");
  const isModalVisible = useSelector(
    (state: AppState) => state.appData.isCategoryModalVisible
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const categoryName = form.category.value.trim();

    if (!categoryName) {
      setFormError(ValidationErrors.categoryEmpty);
      return;
    } else {
      setFormError("");
    }

    dispatch(
      actions.categories.addCategoryRequest({
        name: categoryName,
        color: categoryColor,
      })
    );

    form.reset();
  };

  const handleModalClose = () => {
    dispatch(actions.app.displayCategoryModal());
    setFormError("");
  };

  return (
    <Modal isOpen={isModalVisible} onClose={handleModalClose}>
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
        <FormErrorMessage>{formError}</FormErrorMessage>
      </Form>
      <CategoriesTable />
    </Modal>
  );
};

export default CategoriesModal;
