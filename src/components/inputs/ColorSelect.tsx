import React from "react";
import Select from "react-select";

type Props = {
  selectedOption: string;
  options: any;
  onChange: (option: string) => void;
};

const ColorSelect: React.FC<Props> = ({
  selectedOption,
  options,
  onChange,
}) => {
  const index = options.findIndex(
    (option: any) => option.value == selectedOption
  );

  return (
    <Select
      options={options}
      styles={styles}
      label="Single select"
      name="color"
      value={options[index]}
      onChange={(e) => onChange(e.value)}
    />
  );
};

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const styles = {
  container: (styles: any) => ({
    ...styles,
    width: "200px",
    borderRadius: "2px",
    border: "none",
  }),
  control: (styles: any) => ({
    ...styles,
    borderRadius: "2px",
    boxShadow: "none",
    borderColor: "#dfe2e2",
    ":hover": {
      borderColor: "#dfe2e2",
    },
  }),

  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    ...dot(data.color),
  }),
  option: (styles: any, { data, isSelected }: any) => ({
    ...styles,
    ...dot(data.color),
    backgroundColor: isSelected ? "#678786" : null,
    ":hover, :active": {
      backgroundColor: isSelected ? null : "#f5f6f6",
    },
  }),
};

export default ColorSelect;
