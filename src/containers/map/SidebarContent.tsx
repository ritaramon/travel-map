import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultButton from "../../components/buttons/DefaultButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import ColorSelect from "../../components/inputs/ColorSelect";
import TextArea from "../../components/inputs/TextArea";
import Form from "../../components/others/Form";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { defaultCircleColor } from "../../constants/other";
import { actions } from "../../state/actions";
import { AppState } from "../../state/reducers";

interface Props {
  selectedCircleId: string;
}

const SidebarContent: React.FC<Props> = ({ selectedCircleId }) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const { categories, circles } = useSelector((state: AppState) => ({
    categories: state.categoriesData.categories,
    circles: state.circlesData.circles,
  }));

  const selectedCircle = circles.find(
    (circle) => circle._id === selectedCircleId
  );

  const selectedCircleDescription = selectedCircle?.data.data.info ?? "";

  const defaultSelectOption = {
    value: "Default",
    label: "Default",
    color: defaultCircleColor,
  };

  const selectOptions = [
    defaultSelectOption,
    ...categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
        color: category.color,
      };
    }),
  ];

  useEffect(() => {
    setSelectedCategory(
      selectedCircle?.data.data.category ?? defaultSelectOption.value
    );
    formRef.current?.reset();
  }, [selectedCircleId]);

  const handleSelectChange = (option: string) => {
    setSelectedCategory(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const description = form.description.value;
    const previousSelectedCategory = selectedCircle?.data.data.category;
    if (
      selectedCategory === previousSelectedCategory &&
      description === selectedCircleDescription
    )
      return;
    if (selectedCircle) {
      selectedCircle.data.data.info = description;
      selectedCircle.data.data.category = selectedCategory;
      dispatch(actions.circles.updateCircleRequest(selectedCircle));
    }
  };

  return (
    <>
      <SectionWrapper>
        <h2>Details</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ColorSelect
            options={selectOptions}
            selectedOption={selectedCategory}
            onChange={handleSelectChange}
          />
          <TextArea
            name="description"
            rows={8}
            defaultValue={selectedCircleDescription}
            placeholder="Add details.."
          />
          <DefaultButton>Update</DefaultButton>
        </Form>
      </SectionWrapper>
      <SectionWrapper>
        <DeleteButton
          type="button"
          onClick={() =>
            dispatch(actions.circles.deleteCircleRequest(selectedCircleId))
          }
        />
      </SectionWrapper>
    </>
  );
};

export default SidebarContent;
