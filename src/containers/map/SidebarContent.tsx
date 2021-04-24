import React, { useRef, useEffect } from "react";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { addBoardElement, deleteBoardElement } from "../../apis/mapDataApi";
import TextArea from "../../components/inputs/TextArea";
import DefaultButton from "../../components/buttons/DefaultButton";
import RedButton from "../../components/buttons/DeleteButton";
import Form from "../../components/others/Form";
import { AddElementResponse, CellData } from "../../globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { deleteCircleRequest, updateDataById } from "../../state/actions";
import { AppState } from "../../state/reducers";

const SidebarContent: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    formRef.current?.reset();
  }),
    [];
  const dispatch = useDispatch();

  const selectedCircleId = useSelector(
    (state: AppState) => state.appData.selectedCircleId
  );
  const mapElements = useSelector((state: AppState) => state.apiData.data);

  let info: CellData | undefined;

  if (selectedCircleId) {
    info = mapElements.find((element) => element._id === selectedCircleId);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    const form = e.target as HTMLFormElement;
    const elementInfo = { ...info };
    elementInfo.data.data.info = form.description.value;

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
          <RedButton
            type="button"
            onClick={() => dispatch(deleteCircleRequest(selectedCircleId))}
          >
            DELETE
          </RedButton>
        </SectionWrapper>
      )}
    </>
  );
};

export default SidebarContent;
