import React from "react";
import "./MenuButton.css";

export default ({
  handleOnClick,
  faClass,
  classes,
  iconClasses,
  clickCommand
}) => {
  return (
    <button
      className={"mbutton--container rounded-circle shadow " + classes}
      onClick={handleOnClick(clickCommand)}
    >
      <i className={`px-3 py-3 mbutton--icon ${faClass} ` + iconClasses} />
    </button>
  );
};
