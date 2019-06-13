import React, { useState, useEffect } from "react";
import moment from "moment";
import "./CreateTripForm.css";
import { DateRangePicker } from "react-dates";

export default props => {
  const { startDateHandler, endDateHandler } = props;

  const [focusedInput, setFocusInput] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    startDateHandler(moment(startDate).format("YYYY-MM-DD"));
  }, [startDate, startDateHandler]);

  useEffect(() => {
    endDateHandler(moment(endDate).format("YYYY-MM-DD"));
  }, [endDate, endDateHandler]);

  const disabledButtonDisplay = props.disabled
    ? "bg-smokeGrey c-white border-0 p-3 h2 baloo b-radius9 createTripform-button-disabled"
    : "bundleBlueButton border-0 p-3 createTripform-button h2 baloo";

  const onDateChange = (startDate, endDate) => {
    setEndDate(endDate);
    setStartDate(startDate);
  };

  return (
    <>
      <form className="" onSubmit={props.createTripHandler}>
        <div className="form-group">
          <label htmlFor="destination" className="c-huate h2">
            Enter your destination:
          </label>

          <div className="d-flex">
            <div className="bg-white d-flex justify-content-center align-items-center">
              <i className="fas fa-globe-americas createTrip-icon" />
            </div>

            <input
              className="createTripform-input c-smokeBlack mali400 border-0 p-3 w-100"
              type="text"
              name="destination"
              placeholder="City, Country"
              aria-label="Destination by City, Country"
              aria-describedby="basic-addon1"
              onChange={props.destinationHandler}
              value={props.destination}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date" className="c-huate h2">
            Enter your dates:
          </label>
          <DateRangePicker
            noBorder={true}
            block={true}
            numberOfMonths={1}
            daySize={26}
            screenReaderInputMessage={"Enter your depature and return date."}
            showDefaultInputIcon={true}
            hideKeyboardShortcutsPanel={true}
            startDate={startDate}
            startDateId="startDate"
            endDateId="endDate"
            endDate={endDate}
            onDatesChange={({ startDate, endDate }) =>
              onDateChange(startDate, endDate)
            }
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusInput(focusedInput)}
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
    </>
  );
};
