import React from "react";
import "./PackingTabs.css";

export default ({ page, handleOnClick, moveToTrip, windowHeight }) => {
  const packingStyle = page === "packing" ? "tabs-active" : "tabs-inactive";
  const remindersStyle = page === "packing" ? "tabs-inactive" : "tabs-active";
  const ariaPressed = page === "packing";
  const height = Math.floor(windowHeight / 15);
  return (
    <div className="container" style={{ height: `${height}px` }}>
      <div className="row align-items-end tabs--main no-gutters">
        <div className="pl-2 col-8 offset-2 tabs--header">
          <div className="row">
            <button
              type="button"
              aria-pressed={ariaPressed}
              aria-label="Packing Page"
              className="col-4 tabs--button pr-5"
              onClick={handleOnClick("packing")}
            >
              <span className={" " + packingStyle}>Packing</span>
            </button>
            <button
              type="button"
              aria-label="Reminders Page"
              aria-pressed={!ariaPressed}
              className="col-4 tabs--button pl-4"
              onClick={handleOnClick("reminders")}
            >
              <span className={" " + remindersStyle}>Reminders</span>
            </button>
          </div>
        </div>
        <div className="col-2">
          <button
            type="button"
            aria-label="Trip Details Page"
            className="row tabs--button"
            onClick={moveToTrip}
          >
            <span className="col-12 text-left tabs--trip">Trip</span>
            <span className="col-12 text-left tabs--details">Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
