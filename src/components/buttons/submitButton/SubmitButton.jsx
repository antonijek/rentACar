import React from "react";

const SubmitButton = ({
  label,
  className = "",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={className}
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
