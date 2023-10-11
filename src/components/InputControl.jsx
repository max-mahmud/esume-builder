import React from "react";

const InputControl = ({ label, ...props }) => {
  return (
    <div className="bg-slate-200 p-5">
      {label && <label>{label}</label>}
      <input type="text" {...props} />
    </div>
  );
};

export default InputControl;
