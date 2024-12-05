import React from "react";

const InputField = ({ label, name, placeholder, type = "text", register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1  ">
        {label}
      </label>
      <input
        name="name"
        type={type}
        {...register(name, { required: true })}
        placeholder={placeholder}
        className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default InputField;
