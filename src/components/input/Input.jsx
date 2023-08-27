import React from "react";
import { Controller } from "react-hook-form";
import classes from "./input.module.scss";

const Input = ({
  label = "",
  placeholder = "",
  name,
  control,
  error,
  className,
  type = "text",
  onChange,
  disabled = false,
  labelColor = "",
}) => {
  return (
    <div>
      {label && label?.length > 0 && (
        <label className={labelColor}>{label}</label>
      )}
      {control && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              {...field}
              className={className}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span>{error}</span>}
    </div>
  );
};

export default Input;
