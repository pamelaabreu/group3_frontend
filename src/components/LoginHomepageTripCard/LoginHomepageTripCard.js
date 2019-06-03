import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

const gotToTrip = (tripId, props) => e => {
  props.history.push(`/trip/${tripId}`);
};

const LoginHomepageTripCard = props => {
  const { trip } = props;
  const { id, city, country, departure_date, return_date } = trip;

  return (
    <div className={`col-3 card mr-3`} onClick={gotToTrip(id, props)}>
      <div className="card-body">
        <h3>{city}</h3>
        <h6>{country}</h6>
        <p>{moment(departure_date).format("l")}</p>
        <p>{moment(return_date).format("l")}</p>
      </div>
    </div>
  );
};

export default withRouter(LoginHomepageTripCard);
