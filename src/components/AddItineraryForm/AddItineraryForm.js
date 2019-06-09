import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const handleChangeItineraryTypes = event => {
    const value = itineraryTypes.filter(
      element => element.name === event.target.value
    );
    console.log(value);
    setItineraryTypeSelected(value[0]);
  };

  return (
    <div className="col-3 card">
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            onChange={itineraryInputHandler(setItineraryName)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            className="form-control"
            type="text"
            onChange={itineraryInputHandler(setItineraryAddress)}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            className="form-control"
            type="text"
            onChange={itineraryInputHandler(setItineraryPhone)}
          />
        </div>
        <div className="form-group">
          <label>Note:</label>
          <input
            className="form-control"
            type="text"
            onChange={itineraryInputHandler(setItineraryNote)}
          />
        </div>
        <div>
          <select
            valu={itineraryTypes[0]}
            onChange={handleChangeItineraryTypes}
          >
            {itineraryTypes.map((e, i) => (
              <option key={i} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={submitFormHandler}>Submit</button>
      </form>
    </div>
  );
};

export default AddItineraryForm;
