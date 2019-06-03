import React from "react";
import moment from "moment";
import "./CreateTripForm.css";

export default props => {
  let today = moment().format("YYYY-MM-DD");
  let tomorrow = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");

  return (
    <>
      <div className="create-trip-form">
        <form className="" onSubmit={props.createTripHandler}>
          <div className="form-group row justify-content-between">
            <label htmlFor="destination" className="trip-form-label">
              Enter your destination:
            </label>
            <input
              type="text"
              name="destination"
              placeholder="City, Country"
              onChange={props.destinationHandler}
              value={props.destination}
              required
            />
          </div>
          <div className="form-group row justify-content-between">
            <label htmlFor="departure" className="trip-form-label">
              Enter departure date:
            </label>
            <input
              type="date"
              id="departure"
              name="departure"
              min={today}
              required
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={props.departureDateHandler}
              value={props.departureDate}
            />
          </div>
          <div className="form-group row justify-content-between">
            <label htmlFor="departure" className="trip-form-label">
              Enter return date:
            </label>
            <input
              type="date"
              id="return"
              name="return"
              min={tomorrow}
              required
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={props.returnDateHandler}
              value={props.returnDate}
            />
          </div>
          <div className="form-button-container">
            <button className="form-button" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
