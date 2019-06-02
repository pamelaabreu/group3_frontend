import React from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./ToastNotif.css";

const ToastNotif = (image, text) => {
  const ToastNotifContent = (
    <div className="mb-3">
      <div className="row no-gutters">
        <div className="col-4">
          <img src={image} className="card-img" alt={text} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{text}</h5>
          </div>
        </div>
      </div>
    </div>
  );

  return toast(ToastNotifContent, {
    autoClose: 4000,
    transition: Bounce,
    progressClassName: "fancy-progress-bar",
    className: "toastDropShadow"
  });
};

export default ToastNotif;
