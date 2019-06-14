import React from "react";
import "./AddListCard.css";

const AddListButton = props => {
  const {
    createList,
    handleSelectList,
    alertDisplay,
    infoBarHeight,
    width
  } = props;
  const height = Math.floor(infoBarHeight / 2);
  const dynamicSize = name => {
    if (width < 500) return `cList--${name}`;
    if (width >= 500 && width < 990) return `cList--${name}-md`;
    if (width >= 990 && width < 1200) return `cList--${name}-lg`;
    if (width >= 1200 && width < 1300) return `cList--${name}-xlg`;
    if (width > 1300) return `cList--${name}-xxlg`;
  };

  const alert = (
    <div className="alert alert-warning" role="alert">
      Whoops! That list already exists!
    </div>
  );

  if (true) {
    return (
      <>
        <div className={"  mx-1"}>
          <button
            className={dynamicSize("size") + " cList--button"}
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            style={{ height: height }}
          >
            <div className={"cList--inactive p-2 text-left"}>
              <p className="row">
                <span className="col-12">+Add</span>
              </p>
            </div>
          </button>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
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
                {/*     ///////////      /////////////  */}

                <div className="card card-body">
                  Type of List
                  <hr />
                  <div className="input-group mb-3">
                    <select
                      onChange={handleSelectList}
                      className="custom-select"
                      id="inputGroupSelect01"
                    >
                      <option defaultValue>Choose one...</option>
                      <option value="To Do List">To Do List</option>
                      <option value="Shopping List">Shopping List</option>
                    </select>
                    <button
                      className="btn border border-info"
                      data-dismiss="modal"
                      onClick={createList}
                    >
                      Create
                    </button>
                  </div>
                  {alertDisplay ? alert : null}
                </div>
                {/*  /////////////         /////////////////// */}
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

  return (
    <>
      <div className="m-3 card" style={{ width: "18rem" }}>
        <div className="card-body">
          <p>
            <a
              className="btn btn-primary"
              data-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >
              +Add
            </a>
          </p>
          <div className="row">
            <div className="col">
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample1"
              >
                <div className="card card-body">
                  Type of List
                  <hr />
                  <div className="input-group mb-3">
                    <select
                      onChange={handleSelectList}
                      className="custom-select"
                      id="inputGroupSelect01"
                    >
                      <option defaultValue>Choose one...</option>
                      <option value="To Do List">To Do List</option>
                      <option value="Shopping List">Shopping List</option>
                    </select>
                    <button
                      className="btn border border-info"
                      onClick={createList}
                    >
                      Create
                    </button>
                  </div>
                  {alertDisplay ? alert : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddListButton;
