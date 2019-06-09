import React from "react";

import ItineraryCategory from "../ItineraryCategory/ItineraryCategory";
import AddItineraryForm from "../AddItineraryForm/AddItineraryForm";

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
  // const itineraryCategoryNames = props.info.map(e => e.itinerary_name);
  // const categories = findCategories(itineraryCategoryNames);
  console.log(props.info);
  return (
    <div className="col-12">
      <div className="row">
        <h3>Itinerary</h3>
        <button className="btn btn-primary ml-3">add</button>
      </div>
      <div className="row">
        <AddItineraryForm
          trip_id={props.trip_id}
          setTripItinerary={props.setTripItinerary}
        />
        {props.info.map((e, i) => {
          return (
            <div key={i} className="col-3 card ml-3">
              <div className="card-header">
                <h4 className="card-title">{e.itinerary_name}</h4>
              </div>
              <ItineraryCategory category={e} trip={props.trip} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;
