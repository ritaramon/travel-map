import React, { useRef, useEffect, useState } from "react";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import TextArea from "../../components/inputs/TextArea";
import DefaultButton from "../../components/buttons/DefaultButton";
import Form from "../../components/others/Form";
import { CellData } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../state/actions";
import ColorSelect from "../../components/inputs/ColorSelect";
import DeleteButton from "../../components/buttons/DeleteButton";
import { AppState } from "../../state/reducers";
import { defaultCircleColor } from "../../constants/other";

interface Props {
  selectedCircleId: string;
}

const SidebarContent: React.FC<Props> = ({ selectedCircleId }) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  const circles: CellData[] = useSelector(
    (state: AppState) => state.circlesData.circles
  );

  console.log(selectedCategory);

  const categories = useSelector(
    (state: AppState) => state.categoriesData.categories
  );

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
          <DefaultButton>SAVE</DefaultButton>
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
