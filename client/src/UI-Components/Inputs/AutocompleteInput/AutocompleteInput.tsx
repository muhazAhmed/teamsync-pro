import React, { useState } from "react";

interface AutocompleteInputProps {
  suggestions: string[];
  onInputChange: (value: string) => void;
  placeholder:any;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  suggestions,
  onInputChange,
  placeholder
}) => {
  const [inputValue, setInputValue] = useState("");
  let timer: ReturnType<typeof setTimeout>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debounce(() => {
      onInputChange(value);
    }, 300);
  };

  const debounce = (func: () => void, delay: number) => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onInputChange(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteInput;
