import React from "react";

export const Input = ({
  label,
  type = "text",
  id = "",
  name = "",
  onChange,
  InputtextColor = "gray-200",
  borderColor = "gray-600",
  focusBorderColor = "blue-600",
  labelColor = "gray-500",
  value = "",
}) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        className={`block py-2.5 px-0 w-full text-sm text-${InputtextColor} bg-transparent border-0 border-b-2 border-${borderColor} appearance-none focus:outline-none focus:ring-0 focus:border-${focusBorderColor} peer`}
        placeholder=" "
        value={value}
        required
      />
      <label
        htmlFor={id}
        className={`peer-focus:font-medium absolute text-sm text-${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-${focusBorderColor} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label}
      </label>
    </div>
  );
};
