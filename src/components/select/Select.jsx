import React from "react";
import { Controller } from "react-hook-form";

const Select = ({
  label = "",
  options = [],
  name,
  control,
  error,
  className,
  disabled = false,
}) => {
  return (
    <div>
      {label && label.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => {
            // console.log(field);
            return (
              <select {...field} className={className} disabled={disabled}>
                <option value="" disabled>
                  Select an option
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }}
        />
      )}
      {error && error.length > 0 && <span>{error}</span>}
    </div>
  );
};

export default Select;
