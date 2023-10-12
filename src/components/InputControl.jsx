import React from "react";

const InputControl = ({ label, ...props }) => {
  return (
    <div className="bg-slate-50 w-full flex gap-2  py-2">
      {label && <label className="font-medium min-w-[120px]">{label}</label>}
      <input className="bg-slate-50 flex-1 py-1 px-3 focus:outline-none border" type="text" {...props} />
    </div>
  );
};

export default InputControl;
