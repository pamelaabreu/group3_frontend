import React from "react";
import MenuButton from "../MenuButton/MenuButton";
import items from "../../services/items.json";
import "./MenuBar.css";

export default props => {
  const {
    deleteMode,
    handleOnClick,
    itemInput,
    handleOnChange,
    handleCreateItem,
    bagName
  } = props;
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
      <>
        <div className="row justify-content-around">
          <MenuButton
            faClass={"fas fa-plus"}
            handleOnClick={handleOnClick}
            attributes={{
              "data-toggle": "modal",
              "data-target": "#addItemToBag"
            }}
          />
          <MenuButton
            faClass={"fas fa-trash-alt"}
            handleOnClick={handleOnClick}
            clickCommand={"startDelete"}
          />
          <MenuButton faClass={"fas fa-search"} handleOnClick={handleOnClick} />
        </div>

        <div
          className="modal fade"
          id="addItemToBag"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="Add Item to bag"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Add item to {bagName} bag
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="p-2">
                  <label>
                    Select an item:
                    <input
                      type="text"
                      onChange={handleOnChange}
                      value={itemInput}
                      list="datalist"
                    />
                  </label>
                  <datalist id="datalist">
                    <option defaultValue>Choose one...</option>
                    {items.general.map((e, i) => {
                      return (
                        <option value={e.name} key={i}>
                          {e.name}
                        </option>
                      );
                    })}
                  </datalist>
                  <button
                    className="my-3 btn-sm border border-info"
                    onClick={handleCreateItem}
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
