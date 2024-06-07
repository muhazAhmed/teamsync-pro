import React, { useState } from "react";
import toast from "react-hot-toast";
import { message } from "../../utils/Constants";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: any;
  name: string;
  label?: string;
  required?: boolean;
  setInputs: (value: any) => void;
  variant?: "primary" | "underline" | "ghost";
  id?: any;
}

const commonStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  width: "100%",
  backgroundColor: "inherit",
  fontSize: "14px",
  textWrap: "wrap"
};

const inputDivStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "center",
  height: "55px",
  padding: "10px",
  position: "relative",
};

const primaryStyle: React.CSSProperties = {
  backgroundColor: "#3F3F46",
  borderRadius: "10px",
};
const ghostStyle: React.CSSProperties = {
  color: "#fff",
  border: "2px solid #00C3E3",
  backgroundColor: "transparent",
  borderRadius: "10px",
};
const underlineStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "black",
  borderBottom: "2px solid #D4D4D8",
};

const CustomInput: React.FC<InputProps> = ({
  type = "text",
  value,
  name,
  label = "",
  required = false,
  placeholder = label,
  variant = "primary",
  setInputs,
  id,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
    setIsInputEmpty(e.target.value === "");
  };

  const handleBlur = () => {
    if (value === "" && required) {
      toast.error(message(label).REQUIRED_FIELD);
    }
    setIsFocused(false);
  };

  return (
    <div
      className="custom-input"
      id={id ? id : undefined}
      style={{
        ...inputDivStyle,
        ...(variant === "primary" && primaryStyle),
        ...(variant === "ghost" && ghostStyle),
        ...(variant === "underline" && underlineStyle),
      }}
    >
      <label
        style={{
          visibility:
            isInputEmpty && !isFocused && !value ? "hidden" : "visible",
          fontSize: "12px",
        }}
        className={isInputEmpty && isFocused && !value ? "slideUp" : ""}
      >
        {label}
        {required && (
          <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
            *
          </span>
        )}
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
