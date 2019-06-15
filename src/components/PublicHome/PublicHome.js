import React from "react";
import "./PublicHome.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import HomeTripCard from "../HomeTripCard/HomeTripCard";
import { getTrips } from "../../services/homeLocalStorage";

const PublicHome = props => {
  const { create_trip_form, loading } = props;
  const savedTripsFromLocalStorage = getTrips();
  const showMbCreateTrip =
    savedTripsFromLocalStorage.length > 0 ? "mb-5" : "createTripForm-mb";
  const changeJustifyTrips =
    savedTripsFromLocalStorage.length > 1
      ? "justify-content-around"
      : "justify-content-between";

  return (
    <div className="publicHomeBanner m-0 p-5 min-vh-100 min-vw-100 ">
      {!loading ? null : <LoadingScreen />}

      <div className="row p-2 m-0 ">
        <div className="col-sm-6 col-md-6 col-lg-6 text-center ">
          <img
            src={BundleLogo}
            width="70%"
            height="70%"
            className=""
            alt="Bundle"
          />
        </div>

        <div
          className={
            "col-sm-6 col-md-6 col-lg-6 p-5 bg-denimBlue b-radius9 ds-lightGrey " +
            showMbCreateTrip
          }
        >
          <h2 className="c-huate mali700 mb-5 display-3">Let's get packing!</h2>
          <p className="h3 mb-5 publicHome-c-babyBlue">
            Bundle takes your destination and travel dates to assemble a
            pre-selected customized packing list.{" "}
          </p>
          {create_trip_form}
        </div>
      </div>

      {savedTripsFromLocalStorage.length === 0 ? null : (
        <div className="row m-2 bg-babyBlue b-radius9 ds-lightGrey">
          <div className="col-12">
            <h2 className="c-denimBlue mali700 display-4 mb-1 p-5 text-center">
              Recently Created Trips
            </h2>
            <div className={"row p-5 " + changeJustifyTrips}>
              <HomeTripCard savedTrips={savedTripsFromLocalStorage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicHome;
