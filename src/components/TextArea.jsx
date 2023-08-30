import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({
  label = "",
  placeholder = "",
  name,
  control,
  error,
  className,
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
              placeholder={placeholder}
              rows="4"
              cols="50"
              {...field}
              className={className}
            />
          )}
        />
      )}
      {error && error?.length > 0 && <span>{error}</span>}
    </div>
  );
};

export default TextArea;
