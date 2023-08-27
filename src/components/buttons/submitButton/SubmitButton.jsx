import React from "react";

const SubmitButton = ({ label, className = "", onClick = () => {} }) => {
  return (
    <button
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
