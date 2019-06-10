import React from "react";

export default ({ page, handleOnClick, moveToTrip }) => {
  const packingStyle = page === "packing" ? "" : "text-muted";
  const remindersStyle = page === "packing" ? "text-muted" : "";
  return (
    <div className="container">
      <div className="row">
        <div className="col-10">
          <button className="btn" onClick={handleOnClick("packing")}>
            <span className={"" + packingStyle}>Packing</span>
          </button>
          <button className="btn " onClick={handleOnClick("reminders")}>
            <span className={"" + remindersStyle}>Reminders</span>
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
