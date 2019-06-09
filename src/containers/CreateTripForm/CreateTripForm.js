import React from "react";
import moment from "moment";
import "./CreateTripForm.css";

export default props => {
  let today = moment().format("YYYY-MM-DD");
  let tomorrow = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");

  const disabledButtonDisplay = props.disabled
    ? "bg-white c-smokeGrey border-0 p-3 h4 baloo b-radius9"
    : "bundleBlueButton border-0 p-3 createTripform-button h4 baloo";

  return (
    <>
      <div className="create-trip-form">
        <form className="" onSubmit={props.createTripHandler}>
          <div className="form-group">
            <label htmlFor="destination" className="c-bundleBlue h4">
              Enter your destination:
            </label>
            <input
              className="form-control c-denimBlue bundleBlue-border-bottom-3 h4"
              type="text"
              name="destination"
              placeholder="City, Country"
              aria-label="Destination by City, Country"
              onChange={props.destinationHandler}
              value={props.destination}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination" className="c-bundleBlue h4">
              Enter departure date:
            </label>
            <input
              className="form-control c-denimBlue bundleBlue-border-bottom-3 h4"
              type="date"
              id="departure"
              name="departure"
              min={today}
              required
              aria-label="Departure Date"
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={props.departureDateHandler}
              value={props.departureDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination" className="c-bundleBlue h4">
              Enter return date:
            </label>
            <input
              className="form-control c-denimBlue bundleBlue-border-bottom-3 h4"
              type="date"
              id="return"
              name="return"
              min={tomorrow}
              aria-label="Return Date"
              required
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={props.returnDateHandler}
              value={props.returnDate}
            />
          </div>
          <div className="d-flex justify-content-center p-2">
            <button
              type="submit button"
              className={disabledButtonDisplay}
              data-toggle="modal"
              data-target="#modalScrollable"
              disabled={props.disabled}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
