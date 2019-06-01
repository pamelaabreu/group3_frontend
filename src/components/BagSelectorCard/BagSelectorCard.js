import React from "react";
import "./BagSelectorCard.css";

export default props => {
  const {
    bag_type,
    handleOnClick,
    countAndKey: { count, key },
    displayBag
  } = props;
  const selected = key === displayBag ? " " : " bag--card-color ";
  return (
    <div className={"col-3 mx-1 mt-2 card p-0 pack--bag-width" + selected}>
      <button
        className="card-body row"
        onClick={handleOnClick("bag", { key, bag_type })}
      >
        <h5 className="card-title">{bag_type}</h5>
        <p className="card-text">
          <span>{count} Items unpacked</span>
        </p>
      </button>
    </div>
  );
};
