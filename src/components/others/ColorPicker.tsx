import React, { useState } from "react";
import { GithubPicker } from "react-color";
import styled from "styled-components";

interface Props {
  onColorChange?: (color: string) => void;
  defaultColor?: string;
  disableSelect?: boolean;
}

interface ColorProps {
  color: string;
}

interface SwatchProps {
  disabled: boolean;
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
        onClick={() => !disableSelect && handleClick()}
      >
        <Color color={color} />
      </Swatch>
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={handleClick} />
          <GithubPicker
            width="170px"
            color={color}
            onChange={(e) => handleChange(e.hex)}
          />
        </Popover>
      ) : null}
    </div>
  );
};

const Swatch = styled.div<SwatchProps>`
  padding: 5px;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
`;

const Color = styled.div<ColorProps>`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${(props) => props.color};
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
