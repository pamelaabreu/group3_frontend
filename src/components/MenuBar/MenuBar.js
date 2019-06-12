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
    handleCreateItem
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
          class="modal fade"
          id="addItemToBag"
          tabindex="-1"
          role="dialog"
          aria-labelledby="Add Item to bag"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
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
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
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
