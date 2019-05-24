import React, { useState } from 'react';
import "./Modal.css";

const Modal = props => {
    const [show, showmodal] = useState(false);

    const handleClose = () => showmodal(false);

    const handleShow = () => showmodal(true);

    return (
        <>
            <button onClick={handleShow}>{props.modalButtonText}</button>

            <div className={show ? "displayModal flipOutY" : "displayNone"} >
                <div className="displayModalMain">
                    <button className="modalCloseButton" onClick={handleClose}>x</button>
                    <div className="modalContent">
                        {props.modalContent}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;