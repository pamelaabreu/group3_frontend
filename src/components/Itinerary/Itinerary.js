import React from "react";

import ItineraryCategory from "../ItineraryCategory/ItineraryCategory";

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
  const itineraryCategoryNames = props.info.map(e => e.itinerary_name);
  const categories = findCategories(itineraryCategoryNames);
  return (
    <div className="col-12">
      <h3>Itinerary</h3>
      <button className="btn btn-primary">add</button>
      <div className="row">
        {categories.map(category => {
          return (
            <div className="col-5 card ml-3" style={{ padding: "0" }}>
              <div className="card-header">
                <h4 className="card-title">{category}</h4>
              </div>
              {props.info
                .filter(e => e["itinerary_name"] === category)
                .map(e => (
                  <ItineraryCategory category={e} trip={props.trip} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;
