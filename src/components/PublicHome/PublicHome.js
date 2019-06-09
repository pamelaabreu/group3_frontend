import React from "react";
import "./PublicHome.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const PublicHome = props => {
  const { create_trip_form, loading } = props;

  return (
    <>
      {!loading ? null : <LoadingScreen />}
      <div className="publicHomeBanner container-fluid mb-5 min-vh-100">
        <div className="row p-5 h-75">
          <div className="col-sm m-5 pt-0 px-5 pb-2">
            <img src={BundleLogo} width="150" height="150" alt="Bundle" />
            <h2 className="c-white mali700 mt-5 h1">
              Worry less, travel more!
            </h2>
          </div>

          <div className="col-sm m-5 p-5 bg-huate80 b-radius9 pb-5">
            <h2 className="c-bundleBlue mali700 mb-5 h1">Let's get packing!</h2>
            {create_trip_form}
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-sm mr-2">
            <div className="publicHomeWhatPhotoBox" />
          </div>
          <div className="col-sm">
            <h2 className="mali700 h1 c-bundleBlue">What's Bundle?</h2>
            <p className="mali400 h5 c-smokeGrey">
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

      <div className="jumbotron h-50 mb-0 bundleHomeGetPackingBox">
        <div className="container">
          <h1 className="display-4 c-white baloo text-center">
            What are you waiting for? Get Packing!
          </h1>
        </div>
      </div>
    </>
  );
};

export default PublicHome;
