import React, { useState, useEffect } from "react";
import axios from "axios";

import "./AddItineraryForm.css";

import BASE_URL from "../../services/backendUrlConnect";

const itineraryTypesEndpointBase = "/itinerary/";
const AddItineraryForm = props => {
  const [itineraryName, setItineraryName] = useState("");
  const [itineraryAddress, setItineraryAddress] = useState("");
  const [itineraryPhone, setItineraryPhone] = useState("");
  const [itineraryNote, setItineraryNote] = useState("");
  const [itineraryInfo, setItineraryInfo] = useState({});
  const [itineraryTypeSelected, setItineraryTypeSelected] = useState("");
  const [itineraryTypes, setItineraryTypes] = useState([]);

  const itineraryInputHandler = setItineraryState => e => {
    setItineraryState(e.target.value);
  };

  const submitFormHandler = e => {
    e.preventDefault();

    console.dir({
      name: itineraryName,
      address: itineraryAddress,
      phone: itineraryPhone,
      note: itineraryNote,
      trip_id: props.trip_id,
      itinerary_type: itineraryTypeSelected.id
    });
    setItineraryInfo({
      name: itineraryName,
      address: itineraryAddress,
      phone: itineraryPhone,
      note: itineraryNote,
      trip_id: props.trip_id,
      itinerary_type: itineraryTypeSelected.id
    });

    postItinerary({
      name: itineraryName,
      address: itineraryAddress,
      phone: itineraryPhone,
      note: itineraryNote,
      trip_id: props.trip_id,
      itinerary_type: itineraryTypeSelected.id
    }).then(itinerary => {
      console.log(itinerary.data);
      props.setTripItinerary(itinerary.data.itineraries);
    });
  };

  const postItinerary = data => {
    return axios({
      method: "post",
      url: itineraryTypesEndpointBase,
      baseURL: BASE_URL,
      data
    });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${itineraryTypesEndpointBase}types/all`,
      baseURL: BASE_URL
    }).then(itineraryTypes => {
      setItineraryTypes(itineraryTypes.data);
      setItineraryTypeSelected(itineraryTypes.data[0]);
    });
  }, []);

  const capitalize = target => {
    return target
      .split(" ")
      .map(e => `${e[0].toUpperCase()}${e.slice(1)}`)
      .join(" ");
  };
  const handleChangeItineraryTypes = event => {
    const value = itineraryTypes.filter(
      element => element.name === event.target.value
    );
    console.log(value);
    setItineraryTypeSelected(value[0]);
  };

  return (
    <div className="global-card add-itinerary-form-container">
      <form>
        <select
          className="form-control-lg add-itinerary-form-type-selector col-12"
          value={itineraryTypes[0]}
          onChange={handleChangeItineraryTypes}
        >
          {itineraryTypes.map((e, i) => (
            <option key={i} value={e.value}>
              {capitalize(e.name)}
            </option>
          ))}
        </select>
        <div className="form-group row mt-4">
          <label className="col-lg-4 add-itinerary-form-label">Name:</label>
          <input
            className="col-lg-8 form-control form-control-lg"
            type="text"
            onChange={itineraryInputHandler(setItineraryName)}
          />
        </div>
        <div className="form-group row">
          <label className="col-lg-4 add-itinerary-form-label">Address:</label>
          <input
            className="col-lg-8 form-control form-control-lg"
            type="text"
            onChange={itineraryInputHandler(setItineraryAddress)}
          />
        </div>
        <div className="form-group row">
          <label className="col-lg-4 add-itinerary-form-label">Phone:</label>
          <input
            className="col-lg-8 form-control form-control-lg"
            type="text"
            onChange={itineraryInputHandler(setItineraryPhone)}
          />
        </div>
        <div className="form-group row">
          <label className="col-lg-4 add-itinerary-form-label">Note:</label>
          <input
            className="col-lg-8 form-control form-control-lg"
            type="text"
            onChange={itineraryInputHandler(setItineraryNote)}
          />
        </div>
        <button
          className="btn btn-outline-success btn-lg mt-2"
          onClick={submitFormHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItineraryForm;
