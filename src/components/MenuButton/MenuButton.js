import React from "react";
import "./MenuButton.css";

export default ({ handleOnClick, faClass, classes, iconClasses }) => {
  return (
    <button className={"mbutton--container " + classes} onClick={handleOnClick}>
      <i className={`fas ${faClass} ` + iconClasses} />
    </button>
  );
};
