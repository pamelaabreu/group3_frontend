import React from "react";

export default props => {
  const { bag_id, bag_type, item_count, handleOnClick } = props;
  return (
    <div className="col-3 mx-1 mt-2 card p-0 pack--bag-width">
      <button className="card-body row" onClick={handleOnClick("bag", bag_id)}>
        <h5 className="card-title">{bag_type}</h5>
        <p className="card-text">
          <span>{item_count} Items unpacked</span>
        </p>
      </button>
    </div>
  );
};
