import React from "react";

interface Option {
  label: string;
  value: string;
}

interface DropDownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ options, onSelect }) => {
  return (
    <>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
