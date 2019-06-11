import React from "react";
import Bag from "../../../components/Bag/Bag";
import DeleteConfirm from "../../../components/DeleteConfirm/DeleteConfirm";
import AddItemButton from "../RemindersPage/AddItemButton/AddItemButton";
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
    deleteMode
  } = props;
  return (
    <div className="pt-4 container ppage--main">
      <div className="row justify-content-around no-gutters">
        <div className="col-12">
          <Bag
            items={bagContents}
            deleteMode={deleteMode}
            handleOnClick={handleOnClick}
            handleChange={handleInputChange}
            onKeyPress={onKeyPress}
            width={width}
          />
        </div>
        <div className="row p-0">
          <div className="col">
            <AddItemButton
              itemInput={itemInput}
              handleOnChange={handleOnChange}
              handleCreateItem={handleCreateItem}
            />
          </div>
          <div className="col">
            <DeleteConfirm
              deleteMode={deleteMode}
              handleOnClick={handleOnClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
