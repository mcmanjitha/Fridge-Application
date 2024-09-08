import React from 'react';

const InputField = ({ value, onChange, type, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
    placeholder={placeholder}
  />
);

export default InputField;
