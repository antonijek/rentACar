import React from "react";
import classes from "./input.module.scss";
import { Controller } from "react-hook-form";

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
  min = "",
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
              min={min}
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
      {error && error?.length > 0 && (
        <span className={classes["error"]}>{error}</span>
      )}
    </div>
  );
};

export default Input;
