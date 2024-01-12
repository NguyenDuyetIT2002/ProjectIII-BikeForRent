// Dropdown.js
import React from 'react';

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} value={value}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;