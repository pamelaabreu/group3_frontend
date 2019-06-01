import React from "react";

export default (props => {
    const { bag_type, handleOnClick, countAndKey: {count, key}} = props;
    return (
          <div className="col-3 mx-1 mt-2 card p-0 pack--bag-width">
            <button className="card-body row" onClick={handleOnClick("bag", key)}>
              <h5 className="card-title">{bag_type}</h5>
              <p className="card-text"> 
                <span>{count} Items unpacked</span>
              </p>
            </button>
        </div>
    );
});