import React from "react";
import "./MenuButton.css";

export default ({ handleOnClick, faClass, classes, iconClasses }) => {
  return (
    <button
      className={"mbutton--container rounded-circle shadow " + classes}
      onClick={handleOnClick}
    >
      <i className={`px-3 py-3 mbutton--icon fas ${faClass} ` + iconClasses} />
    </button>
  );
};
