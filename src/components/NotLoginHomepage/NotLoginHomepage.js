import React from "react";
import "./Home.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";

const NotLoginHomepage = props => {
  const { create_trip_form } = props;

  return (
    <>
      <div className="bundleHomeImage container-fluid">
        <div className="row  p-5">
          <div className="col-sm m-5 p-5" style={{ border: "1px solid black" }}>
            <img src={BundleLogo} width="150" height="150" alt="Bundle" />
            <h2>Worry less, travel more!</h2>
          </div>

          <div className="col-sm m-5 p-5" style={{ border: "1px solid black" }}>
            {create_trip_form}
          </div>
        </div>
      </div>

      <div className="container bundleHomeWhatBox">
        <div className="row">
          <div className="col-sm">
            <div className="bundleHomeWhatPhotoBox" />
          </div>
          <div className="col-sm">
            <h2>What's Bundle?</h2>
            <p>
              We provide a trip-management hub for inexperienced travelers to
              keep track of all their necessities. They’ll have a smoother and
              more enjoyable experience preparing for it because they can
              address all their travel considerations from one place. Bundle
              creates suggested packing checklists and help complete them with
              in-app planning until day of departure.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid bundleHomeGetPackingBox">
        <h1>What are you waiting for? Get Packing!</h1>
      </div>
    </>
  );
};

export default NotLoginHomepage;
