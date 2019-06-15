import React, { Component } from "react";
import axios from "axios";

import LoginHomepageTripCard from "../LoginHomepageTripCard/LoginHomepageTripCard";
import baseURL from "../../services/backendUrlConnect";
const tripEndpointBase = "/login_homepage/";

class LoginHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: {},
      create_new_trip: false
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const trips = await axios({
      method: "get",
      url: `${tripEndpointBase}${user.uid}`,
      baseURL
    });

    this.setState({ trips: trips.data });
  }

  createNewTripClickHandler = e => {
    this.setState({ create_new_trip: !this.state.create_new_trip });
  };
  render() {
    const { trips, create_new_trip: createNewTrip } = this.state;
    const { upcoming_trips, past_trips } = trips;
    const { create_trip_form: createTripForm, user } = this.props;
    return (
      <div className="container">
        <div>
          <h1>Upcoming Trips</h1>
          <div className="col-12 row" style={{ overflowY: "scroll" }}>
            {upcoming_trips &&
              upcoming_trips.map((e, i) => (
                <LoginHomepageTripCard key={i} trip={e} />
              ))}
          </div>
        </div>

        <div>
          <h1>Past Trips</h1>
          <div className="col-12 row" style={{ overflowY: "scroll" }}>
            {past_trips &&
              past_trips.map((e, i) => (
                <LoginHomepageTripCard key={i} trip={e} index={i} />
              ))}
          </div>
        </div>
        <div className="row justify-content-center">
          <div>
            <div onClick={this.createNewTripClickHandler}>
              {createNewTrip ? <h4>Cancel</h4> : <h4>Create a trip</h4>}
            </div>
            {createNewTrip ? createTripForm : null}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginHomepage;
