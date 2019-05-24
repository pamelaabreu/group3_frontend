import React from "react";

import firebase from "../../firebase";
import axios from "axios";

class Signup extends React.Component {
  state = {
    inputs: {
      username: "",
      email: "",
      password: ""
    },
    firebaseCreateUserError: ""
  };

  handleInputChange = e => {
    const { inputs } = { ...this.state };
    inputs[e.target.name] = e.target.value.trim();

    this.setState({ inputs });
  };

  handleSignupSubmit = e => {
    e.preventDefault();

    const { inputs } = this.state;
    const { email, password } = inputs;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => response.user.uid,

        // This is the handling for the Firebase error when creating a user
        ({ message }) => this.setState({ firebaseCreateUserError: message })
      )
      .then(firebaseUid => {
        // Logic for creating user in the backend
      });
  };

  render() {
    const { inputs, firebaseCreateUserError } = this.state;
    const inputsArray = Object.entries(inputs);

    return (
      <form onSubmit={this.handleSignupSubmit}>
        {firebaseCreateUserError ? <p>{firebaseCreateUserError}</p> : null}
        {inputsArray.map(([inputName, inputValue], index) => {
          const inputType =
            inputName.toLowerCase() === "password" ? "password" : "text";
          const isRequired =
            inputName.toLowerCase() !== "username" ? true : false;
          return (
            <input
              onChange={this.handleInputChange}
              key={index}
              type={inputType}
              value={inputValue}
              name={inputName}
              placeholder={inputName}
              required={isRequired}
              min='1'
            />
          );
        })}
        <button type='submit'>Signup</button>
      </form>
    );
  }
}

export default Signup;
