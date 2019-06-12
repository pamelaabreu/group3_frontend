import React from "react";
import Bag from "../../../components/Bag/Bag";
import MenuBar from "../../../components/MenuBar/MenuBar";
import "./PackingPage.css";

//https://media.giphy.com/media/gngO1gmBhS9na/giphy.gif
export default props => {
  const {
    width,
    handleOnClick,
    handleInputChange,
    onKeyPress,
    handleOnChange,
    handleCreateItem,
    bagContents,
    itemInput,
    deleteMode,
    height,
    bagName
  } = props;
  const containerHeight = Math.floor(height * 0.83);
  const bagHeight = Math.floor(height * 0.75);
  return (
    <div
      className="pt-4 container ppage--main"
      style={{ height: containerHeight + "px" }}
    >
      <div className="row justify-content-around no-gutters">
        <div className="col-12 ppage--bag" style={{ height: bagHeight + "px" }}>
          <Bag
            items={bagContents}
            deleteMode={deleteMode}
            handleOnClick={handleOnClick}
            handleChange={handleInputChange}
            onKeyPress={onKeyPress}
            width={width}
          />
        </div>
        <div className="col-12">
          <div className="px-5">
            <MenuBar
              deleteMode={deleteMode}
              handleOnClick={handleOnClick}
              itemInput={itemInput}
              handleOnChange={handleOnChange}
              handleCreateItem={handleCreateItem}
              bagName={bagName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
