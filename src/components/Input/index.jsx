import React, { useState } from "react";

const Input = ({
  value,
  label,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  className = "",
  id = Date.now() * Math.random(),
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-lolGold-2 text-sm font-bold mb-2"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : ""}
      </label>

      <input
        id={id}
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={
          "shadow appearance-none border rounded w-full py-2 px-3 bg-lolGold-2 text-lolBlue-7 leading-tight focus:outline-none focus:shadow-outline " +
          className
        }
      />
    </div>
  );
};

export default Input;
