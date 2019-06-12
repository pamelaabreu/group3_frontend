import React from "react";
import MenuButton from "../MenuButton/MenuButton";
import "./MenuBar.css";

export default props => {
  return (
    <div className="row justify-content-around">
      <MenuButton faClass={"fa-plus"} />
    </div>
  );
};
