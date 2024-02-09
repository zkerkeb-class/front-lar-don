import React, { useState } from 'react';

const Input = ({
  value,
  label,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  id = Date.now() * Math.random(),
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' +
          className
        }
      />
    </>
  );
};

export default Input;
