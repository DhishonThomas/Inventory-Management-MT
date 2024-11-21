import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string | number;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
  required?: boolean;
  disable?: boolean;
  marginBottom?: string;
  bgColor?: string;
  textColor?: string;
  textWhite?: boolean;
  textBlack?: boolean;
  widthFull?: boolean;
  marginBottomLabel?: string;
  customClass?: string;
  width_1_3?:boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      type,
      name,
      value,
      onchange,
      placeholder,
      required = false,
      disable = false,
      marginBottom = "mb-4",
      bgColor = "bg-slate-700",
      textColor = "",
      widthFull = false,
      marginBottomLabel = "",
      customClass = "",
      width_1_3=false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const isPasswordField = type === "password";
    const isSearchField = type === "search";

    return (
      <div className={`relative flex flex-col ${widthFull ? "w-full" : ""} ${marginBottom || "mb-4"}`}>
        {label && (
          <label className={`mb-${marginBottomLabel || "2"} text-white font-medium`}>
            {label}
          </label>
        )}

        <div className="relative">
          <input
            className={`${bgColor} ${width_1_3?"w-1/3":""} ${customClass} ${textColor} px-4 py-2 rounded-md
              border border-transparent focus:border-blue-500 focus:outline-none
              focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out w-full ${
                isPasswordField ? "pr-10" : isSearchField ? "pl-10" : ""
              }`}
            type={isPasswordField && showPassword ? "text" : type}
            name={name}
            value={value}
            onChange={onchange}
            placeholder={placeholder}
            required={required}
            disabled={disable}
            ref={ref || undefined}
          />

          {isPasswordField && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}

          {isSearchField && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center h-full text-gray-500">
              <FaSearch />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
