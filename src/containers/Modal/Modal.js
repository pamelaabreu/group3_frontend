import React from "react";
import "./Modal.css";
import Suggestions from "../../containers/Suggestions/Suggestions";

const Modal = props => {
  return (
    <>
      <div
        className="modal fade flipOutY"
        id="exampleModalScrollable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content b-radius9 position-relative">
            <Suggestions
              destination={props.destination}
              duration={props.duration}
              departureDate={props.departureDate}
              returnDate={props.returnDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
