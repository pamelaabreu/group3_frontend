import React from "react";

import firebase from "../../firebase";

class Login extends React.Component {
  state = {
    inputs: {
      email: "",
      password: ""
    }
  };

  handleInputChange = e => {
    const { inputs } = { ...this.state };
    inputs[e.target.name] = e.target.value.trim();

    this.setState({ inputs });
  };

  handleLoginSubmit = e => {
    e.preventDefault();

    const { inputs } = this.state;
    const { email, password } = inputs;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((err) => console.log(err))
  }

  render() {
    const { inputs } = this.state;
    const inputsArray = Object.entries(inputs);

    return (
      <form onSubmit={this.handleLoginSubmit}>
        {inputsArray.map(([inputName, inputValue], index) => {
          const inputType =
            inputName.toLowerCase() === "password" ? "password" : "text";

          return (
            <input
              key={index}
              onChange={this.handleInputChange}
              type={inputType}
              value={inputValue}
              name={inputName}
              placeholder={inputName}
              required
              min="1"
            />
          );
        })}
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
