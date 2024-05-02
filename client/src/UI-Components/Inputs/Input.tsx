import React, { useState } from "react";
import toast from "react-hot-toast";
import { message } from "../../utils/Constants";

interface InputProps {
  type?: string;
  placeholder: string;
  value: any;
  name: any;
  label?: string;
  setInputs: (value: any) => void;
}

const commonStyle = {
  border: "none",
  outline: "none",
  width: "100%",
  backgroundColor: "inherit",
  fontSize: "14px",
};

const CustomInput: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  name,
  label = name,
  setInputs,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsInputEmpty(e.target.value === "");
  };

  const handleBlur = () => {
    if (value === "") {
      toast.error(message(label).REQUIRED_FIELD);
    }
    setIsFocused(false);
  };

  return (
    <div
      className="custom-input"
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#3F3F46",
        borderRadius: "10px",
        height: "55px",
        padding: "10px",
      }}
    >
      <label
        style={{
          visibility: isInputEmpty && !isFocused ? "hidden" : "visible",
          fontSize: "12px",
        }}
        className={isInputEmpty && isFocused ? "slideUp" : ""}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={isInputEmpty && !isFocused ? placeholder : ""}
        value={value}
        name={name}
        style={{
          ...commonStyle,
          marginBottom: isInputEmpty && !isFocused ? "1rem" : "0rem",
        }}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default CustomInput;
