import React, { useState } from "react";
import { GithubPicker } from "react-color";
import styled from "styled-components";

interface Props {
  onColorChange?: (color: string) => void;
  defaultColor?: string;
  disableSelect?: boolean;
}

interface SwatchProps {
  disabled: boolean;
  color: string;
}

const ColorPicker: React.FC<Props> = ({
  defaultColor,
  onColorChange,
  disableSelect = false,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(defaultColor ?? "#7BDCB5");
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleChange = (color: string) => {
    setColor(color);
    if (onColorChange) {
      onColorChange(color);
    }
    setDisplayColorPicker(false);
  };
  return (
    <div>
      <Swatch
        disabled={disableSelect}
        color={color}
        onClick={() => !disableSelect && handleClick()}
      ></Swatch>
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={handleClick} />
          <GithubPicker
            width="112px"
            color={color}
            onChange={(e) => handleChange(e.hex)}
          />
        </Popover>
      ) : null}
    </div>
  );
};

const Swatch = styled.div<SwatchProps>`
  background: #fff;
  width: 32px;
  height: 32px;
  border-radius: 25px;
  display: inline-block;
  background: ${(props) => props.color};
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
`;

const Popover = styled.div`
  position: absolute;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
export default ColorPicker;
