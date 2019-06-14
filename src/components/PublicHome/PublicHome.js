import React from "react";
import "./PublicHome.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";
// import BundleLoad from "../../assets/images/background_images/bundle_load.gif";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import HomeTripCard from "../HomeTripCard/HomeTripCard";
import { getTrips } from "../../services/homeLocalStorage";

const PublicHome = props => {
  const { create_trip_form, loading } = props;
  const savedTripsFromLocalStorage = getTrips();

  return (
    <div className="publicHomeBanner m-0 p-5 min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">
      {/* <div className="bg-bundleBlue m-0 p-0 min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">   */}
      {!loading ? null : <LoadingScreen />}

      <div className="row p-5 m-0 publicHome-width">
        <div className="col-sm-6 col-md-6 col-lg-6 text-center">
          <img
            src={BundleLogo}
            width="70%"
            height="70%"
            className=""
            alt="Bundle"
          />
          {/* <img src={BundleLoad} width="100%" height="100%" className="img-thumbnail border-0 p-0 bg-transparent" alt="Bundle" /> */}
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 p-5 bg-denimBlue b-radius9 ds-lightGrey createTripForm-mb">
          <h2 className="c-huate mali700 mb-5 display-3">Let's get packing!</h2>
          {create_trip_form}
        </div>

        {savedTripsFromLocalStorage.length === 0 ? null : (
          <div className="col-sm-6 col-md-6 col-lg-6 row p-5 bg-transparent ">
            {/* overflow-auto */}
            <h2 className="c-white mali700 display-4 mb-2">
              Recently Created Trips
            </h2>
            <div className=" d-flex justify-content-around">
              <HomeTripCard savedTrips={savedTripsFromLocalStorage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHome;
