import React from "react";
import "./Modal.css";
import Suggestions from "../../containers/Suggestions/Suggestions";

const Modal = props => {
  return (
    <>
      {/* <div className={props.show ? "displayModal flipOutY" : "displayNone"} 
      tabIndex="-1" 
      role="dialog" 
      aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true"
      >
        <div className="displayModalMain rounded">
          <button className="modalCloseButton" onClick={props.handleClose}>
            x
          </button>
          <div className="modalContent">
            <Suggestions
              destination={props.destination}
              duration={props.duration}
              departureDate={props.departureDate}
              returnDate={props.returnDate}
            />
          </div>
        </div>
      </div> */}

      <div
        className="modal fade"
        id="exampleModalScrollable"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalScrollableTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">YER</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
