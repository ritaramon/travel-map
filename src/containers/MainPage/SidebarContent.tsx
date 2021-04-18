import React, { useRef, useEffect } from "react";
// import Input from "../../components/inputs/Input";
import SectionWrapper from "../../components/wrappers/SectionWrapper";
import { addCircle } from "../../apis/mapDataApi";
import TextArea from "../../components/inputs/TextArea";
import DefaultButton from "../../components/buttons/DefaultButton";
import RedButton from "../../components/buttons/DeleteButton";
import Form from "../../components/others/Form";
import { CellData } from "../../globalTypes";
import { useDispatch } from "react-redux";
import { deleteCircle, updateData } from "../../state/actions";

interface Props {
  info?: CellData;
}

const SidebarContent: React.FC<Props> = ({ info }) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    formRef.current?.reset();
  }),
    [];
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    const target = e.target as HTMLFormElement;
    const textArea = target[0] as HTMLTextAreaElement;
    const elementData = {
      x: info.x,
      y: info.y,
      data: {
        name: info.data.name,
        color: info.data.color,
        data: {
          radius: info.data.data.radius,
          info: textArea.value,
        },
      },
    };

    addCircle(elementData).then((response: number) => {
      if (response === 200) {
        console.log("ok");
        dispatch(updateData(elementData));
      }
    });
  };

  return (
    <SectionWrapper>
      <h2>Details</h2>
      {info?._id && (
        <>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TextArea rows={8} defaultValue={info?.data.data.info ?? ""} />
            <DefaultButton>Save</DefaultButton>
          </Form>
          <RedButton
            type="button"
            onClick={() => dispatch(deleteCircle(info._id!))}
          >
            Delete
          </RedButton>
        </>
      )}
    </SectionWrapper>
  );
};

export default React.memo(SidebarContent);
