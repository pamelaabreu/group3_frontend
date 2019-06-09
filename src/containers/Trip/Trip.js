import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import APIKEYS from "../../config.json";

import Itinerary from "../../components/Itinerary/Itinerary";
import Weather from "../../components/Weather/Weather";

const baseURL = "http://localhost:5000";
const itineraryEndpointBase = "/itinerary/";
const tripEndpointBase = "/trip/";
const weatherEndpointBase = "/weather/";

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      itinerary: [],
      weather_info: []
    };
  }

  async componentDidMount() {
    const { trip_id: tripID } = this.props.match.params;

    const trip = await axios({
      method: "get",
      url: `${tripEndpointBase}${tripID}`,
      baseURL
    });

    const itinerary = await axios({
      method: "get",
      url: `${itineraryEndpointBase}${tripID}`,
      baseURL
    });

    const location = `${this.state.trip.city} ${this.state.trip.country}`;
    const mqLocation = await axios({
      method: "get",
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${
        APIKEYS.MQ_API_KEY
      }&location=${location}`
    });

    const locationLatLng =
      mqLocation.data.results[0].locations[0].displayLatLng;
    const weather = await axios({
      method: "get",
      url: weatherEndpointBase,
      params: {
        lat: locationLatLng.lat,
        lng: locationLatLng.lng
      },
      baseURL
    });

    weather.data.data.shift();

    this.setState({
      itinerary: itinerary.data,
      weather_info: weather.data.data.slice(0, 5),
      trip: trip.data
    });
  }

  setNewItinerary = itinerary => {
    this.setState({ itinerary });
  };

  moveToPack = () => {
    const { trip_id } = this.props.match.params;
    this.props.history.push("/pack/" + trip_id);
  };

  render() {
    const { city, country, departure_date, return_date } = this.state.trip;
    const { trip_id: tripID } = this.props.match.params;
    return (
      <div className="container mt-5">
        <div className="row justify-content-end">
          <div className="col-2">
            <button className="row" onClick={this.moveToPack}>
              <span className="col-12 text-center">Pack</span>
              <i className="col-12 fas fa-long-arrow-alt-right text-center pack--arrow-transform" />
            </button>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-lg-4">
            <div>
              <h5 className="trip-details-title">Trip Details</h5>
              <h6 className="trip-destination-title">
                {city}, {country}
              </h6>
            </div>
            <div>
              <p>
                {moment()
                  .endOf(departure_date)
                  .to(return_date)}
              </p>
            </div>
          </div>
          <div className="col-lg-8">
            <Weather weatherInfo={this.state.weather_info} />
          </div>
        </div>
        <div className="col-12 row mt-3">
          <Itinerary
            info={this.state.itinerary}
            trip={this.state.trip}
            trip_id={tripID}
            setTripItinerary={this.setNewItinerary}
          />
        </div>
      </div>
    );
  }
}

export default Trip;
