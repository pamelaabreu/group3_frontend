import React from "react";
import "./PackingTabs.css";

export default ({ page, handleOnClick, moveToTrip, windowHeight }) => {
  const packingStyle = ""; //page === "packing" ? "" : "text-muted";
  const remindersStyle = ""; //page === "packing" ? "text-muted" : "";
  const height = Math.floor(windowHeight / 15);
  return (
    <div className="container" style={{ height: `${height}px` }}>
      <div className="row tabs--main">
        <div className="col-8 offset-2 tabs--header">
          <div className="row">
            <button
              type="button"
              className="col tabs--button"
              onClick={handleOnClick("packing")}
            >
              <span className={" " + packingStyle}>Packing</span>
            </button>
            <button
              type="button"
              className="col tabs--button"
              onClick={handleOnClick("reminders")}
            >
              <span className={" " + remindersStyle}>Reminders</span>
            </button>
          </div>
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
