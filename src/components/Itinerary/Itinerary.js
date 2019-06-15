import React, { useState } from "react";

import ItineraryCategory from "../ItineraryCategory/ItineraryCategory";
import AddItineraryForm from "../AddItineraryForm/AddItineraryForm";

import "./Itinerary.css";

const findCategories = categories => {
  const uniqueCategoryNames = {};
  categories.forEach(e => {
    if (!uniqueCategoryNames[e]) {
      uniqueCategoryNames[e] = 1;
    } else {
      uniqueCategoryNames[e]++;
    }
  });

  let categoryNamesUsedOnce = [];
  Object.entries(uniqueCategoryNames).forEach(e => {
    if (e[1] === 1) {
      categoryNamesUsedOnce.push(e[0]);
    }
  });

  return categoryNamesUsedOnce;
};

const Itinerary = props => {
  const [itineraryFormDisplay, setItineraryFormDisplay] = useState(false);
  // const itineraryCategoryNames = props.info.map(e => e.itinerary_name);
  // const categories = findCategories(itineraryCategoryNames);

  const itineraryDisplayHandler = e => {
    if (itineraryFormDisplay) {
      e.target.innerHTML = "add";
    } else {
      e.target.innerHTML = "cancel";
    }
    setItineraryFormDisplay(prevState => !prevState);
  };
  console.log(props.info);
  return (
    <div className="itinerary-container">
      <div className="row">
        <h3 className="mt-4 text-white itinerary-title">Itinerary</h3>
        <button
          className="btn btn-primary ml-3 mt-4"
          onClick={itineraryDisplayHandler}
        >
          add
        </button>
      </div>
      <div className="row">
        {itineraryFormDisplay ? (
          <AddItineraryForm
            trip_id={props.trip_id}
            setTripItinerary={props.setTripItinerary}
          />
        ) : null}
        {props.info.length === 0 ? (
          <div
            className="col-12 row justify-content-center"
            style={{ color: "white" }}
          >
            {" "}
            <h1 style={{ fontSize: "5rem" }}>No itineraries yet</h1>{" "}
          </div>
        ) : (
          props.info.map((e, i) => {
            return (
              <div key={i} className="global-card itinerary-card-container">
                <ItineraryCategory category={e} trip={props.trip} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Itinerary;
