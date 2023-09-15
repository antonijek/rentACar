import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({
  label = "",
  placeholder = "",
  name,
  control,
  error,
  className,
  disabled = false,
}) => {
  return (
    <div>
      {label && label?.length > 0 && <label>{label}</label>}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              disabled={disabled}
              placeholder={placeholder}
              rows="4"
              cols="50"
              {...field}
              className={className}
            />
          )}
        />
      )}
      {error && error?.length > 0 && (
        <span style={{ color: "red" }}>{error}</span>
      )}
    </div>
  );
};

export default TextArea;
