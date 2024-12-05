import React from "react";

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-700 font-semibold">
        {label}
      </label>
      <select
        {...register(name, { required: true })}
        className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300">
        {options.map((option) => (
          <option key={option.value} value={option.value} className="p-2">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
