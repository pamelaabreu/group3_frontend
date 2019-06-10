import React from "react";
import "./PackingTabs.css";

export default ({ page, handleOnClick, moveToTrip, windowHeight }) => {
  const packingStyle = page === "packing" ? "" : "text-muted";
  const remindersStyle = page === "packing" ? "text-muted" : "";
  const height = Math.floor(windowHeight / 15);
  return (
    <div className="container" style={{ height: `${height}px` }}>
      <div className="row tabs--main">
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
