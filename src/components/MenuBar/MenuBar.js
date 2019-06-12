import React from "react";
import MenuButton from "../MenuButton/MenuButton";
import "./MenuBar.css";

export default props => {
  const { deleteMode, handleOnClick } = props;
  if (deleteMode) {
    return (
      <div className="row justify-content-around">
        <MenuButton
          faClass={"fas fa-check"}
          handleOnClick={handleOnClick}
          clickCommand={"endDelete"}
          classes={"bg-danger "}
          iconClasses={"text-white"}
        />
      </div>
    );
  } else {
    return (
      <div className="row justify-content-around">
        <MenuButton faClass={"fas fa-plus"} handleOnClick={handleOnClick} />
        <MenuButton
          faClass={"fas fa-trash-alt"}
          handleOnClick={handleOnClick}
          clickCommand={"startDelete"}
        />
        <MenuButton faClass={"fas fa-search"} handleOnClick={handleOnClick} />
      </div>
    );
  }
};
