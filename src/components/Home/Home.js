import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import CreateTripForm from "../../containers/CreateTripForm/CreateTripForm";
import Modal from "../../containers/Modal/Modal";
import { getDuration } from "../../services/suggestions";
import FirebaseAuthContext from "../../context/FirebaseAuth";

import NotLoginHomepage from "../../components/NotLoginHomepage/NotLoginHomepage";
import LoginHomepage from "../../components/LoginHomepage/LoginHomepage";

const Home = props => {
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [duration, setDuration] = useState(null);
  const [show, showmodal] = useState(false);

  const destinationHandler = e => {
    setDestination(e.target.value);
  };

  const departureDateHandler = e => {
    setDepartureDate(e.target.value);
  };

  const returnDateHandler = e => {
    setReturnDate(e.target.value);
  };

  const createTripHandler = e => {
    e.preventDefault();
    let tripDuration = getDuration(departureDate, returnDate);
    setDuration(tripDuration);
    showmodal(true);
  };

  const handleShow = () => showmodal(true);

  const handleClose = () => showmodal(false);

  useEffect(() => {}, [destination, departureDate, returnDate, duration]);

  const createTripForm = (
    <CreateTripForm
      destination={destination}
      destinationHandler={destinationHandler}
      departureDate={departureDate}
      departureDateHandler={departureDateHandler}
      returnDate={returnDate}
      returnDateHandler={returnDateHandler}
      duration={duration}
      createTripHandler={createTripHandler}
    />
  );
  return (
    <>
      {show ? (
        <Modal
          destination={destination}
          duration={duration}
          show={show}
          departureDate={departureDate}
          returnDate={returnDate}
          handleShow={handleShow}
          handleClose={handleClose}
          modalButtonText={"Bundle It!"}
        />
      ) : null}

      {FirebaseUserAuth.user ? (
        <LoginHomepage
          create_trip_form={createTripForm}
          user={FirebaseUserAuth.user}
        />
      ) : (
        <NotLoginHomepage create_trip_form={createTripForm} />
      )}
    </>
  );
};

export default Home;
