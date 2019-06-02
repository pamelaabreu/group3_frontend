import React from "react";

const AddListButton = props => {
  const { createList, handleSelectList, alertDisplay } = props;

  const alert = (
    <div className="alert alert-warning" role="alert">
      Whoops! That list already exists!
    </div>
  );

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
                      <option value="To-Do List">Todo List</option>
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
