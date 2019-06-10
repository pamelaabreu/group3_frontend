import React from "react";

export default ({ page, handleOnClick, moveToTrip }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <button className="btn" onClick={handleOnClick("packing")}>
            <span className={page === "packing" ? "" : "text-muted"}>
              Packing
            </span>
          </button>
          <button className="btn " onClick={handleOnClick("reminders")}>
            <span className={page === "packing" ? "text-muted" : ""}>
              Reminders
            </span>
          </button>
        </div>
        <div className="col-2">
          <button className="row" onClick={moveToTrip}>
            <span className="col-12 text-center">Trip</span>
            <i className="col-12 fas fa-long-arrow-alt-left text-center pack--arrow-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
