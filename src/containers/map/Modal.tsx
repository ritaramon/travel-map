import React, { useState } from "react";
import ReactModal from "react-modal";
import DefaultButton from "../../components/buttons/DefaultButton";
import Input from "../../components/inputs/Input";
import Form from "../../components/others/Form";
import ColorPicker from "../../components/others/ColorPicker";
import ErrorMessage from "../../components/messages/ErrorMessage";
import { useDispatch } from "react-redux";
import { addCategoryRequest } from "../../state/actions";
import CategoriesTable from "./CategoriesTable";

const CategoriesModal: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [categoryColor, setCategoryColor] = useState("#7BDCB5");
  const [formError, setFormError] = useState("");

  ReactModal.setAppElement("#root");
  const dispatch = useDispatch();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "0",
      backgroundColor: "#f5f6f6",
      width: "100%",
      maxWidth: "600px",
    },
    overlay: { zIndex: 2 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const categoryName: string = form.category.value.trim();
    if (!categoryName) {
      setFormError("Enter a category name");
      return;
    } else {
      setFormError("");
    }
    dispatch(addCategoryRequest({ name: categoryName, color: categoryColor }));
    form.reset();
  };

  return (
    <ReactModal isOpen={modalIsOpen} style={customStyles}>
      <button onClick={() => setIsOpen(false)}>close</button>
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
          placeholder="Add category name.."
          maxLength={25}
        />

        <DefaultButton>Add</DefaultButton>
        <ErrorMessage>{formError}</ErrorMessage>
      </Form>
      <CategoriesTable />
    </ReactModal>
  );
};

export default CategoriesModal;
