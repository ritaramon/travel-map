import React, { useRef, useEffect, useState } from "react";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { addBoardElement } from "../../apis/mapDataApi";
import TextArea from "../../components/inputs/TextArea";
import DefaultButton from "../../components/buttons/DefaultButton";
import Form from "../../components/others/Form";
import { AddElementResponse, CellData } from "../../globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { deleteCircleRequest, updateDataById } from "../../state/actions";
import { AppState } from "../../state/reducers";
import ColorSelect from "../../components/inputs/ColorSelect";
import DeleteButton from "../../components/buttons/DeleteButton";

const SidebarContent: React.FC = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const mapElements = useSelector((state: AppState) => state.apiData.data);
  const categories = useSelector(
    (state: AppState) => state.categoriesData.categories
  );
  const selectedCircleId = useSelector(
    (state: AppState) => state.appData.selectedCircleId
  );

  const defaultOption = { value: "Default", label: "Default", color: "orange" };
  let info: CellData | undefined;
  if (selectedCircleId) {
    info = mapElements.find((element) => element._id === selectedCircleId);
  }

  const selectOptions = [
    defaultOption,
    ...categories.map((category) => {
      return {
        value: category.id,
        label: category.name,
        color: category.color,
      };
    }),
  ];

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setSelectedCategory(info?.data.data.category ?? defaultOption.value);
    formRef.current?.reset();
  }, [selectedCircleId]);

  const handleSelectChange = (option: string) => {
    setSelectedCategory(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    const form = e.target as HTMLFormElement;
    console.log(form.color.value);
    const elementInfo = { ...info };
    elementInfo.data.data.info = form.description.value;
    elementInfo.data.data.category = form.color.value;

    addBoardElement(elementInfo).then((response: AddElementResponse) => {
      if (response.status === 200) {
        dispatch(updateDataById(elementInfo));
      }
    });
  };

  return (
    <>
      <SectionWrapper>
        <h2>Details</h2>
        {selectedCircleId && (
          <>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ColorSelect
                options={selectOptions}
                selectedOption={selectedCategory}
                onChange={handleSelectChange}
              />
              <TextArea
                name="description"
                rows={8}
                defaultValue={info?.data.data.info ?? ""}
                placeholder="Add details.."
              />
              <DefaultButton>SAVE</DefaultButton>
            </Form>
          </>
        )}
      </SectionWrapper>
      {selectedCircleId && (
        <SectionWrapper>
          <DeleteButton
            type="button"
            onClick={() => dispatch(deleteCircleRequest(selectedCircleId))}
          />
        </SectionWrapper>
      )}
    </>
  );
};

export default SidebarContent;
