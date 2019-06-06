import React from "react";

import firebase from "../../firebase";

class Login extends React.Component {
  state = {
    inputs: {
      email: "",
      password: ""
    },
    firebaseLoginUserError: ""
  };

  handleInputChange = e => {
    // Copying state
    const { inputs } = { ...this.state };
    // Directly modifying the input object from the copied state
    inputs[e.target.name] = e.target.value.trim();

    // Set State the modified copied input object
    this.setState({ inputs });
  };

  handleLoginSubmit = e => {
    e.preventDefault();

    const { closeMenu } = this.props;
    const { inputs } = this.state;
    const { email, password } = inputs;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(closeMenu())
      .catch(({ message }) =>
        this.setState({ firebaseLoginUserError: message })
      );
  };

  render() {
    const { inputs, firebaseLoginUserError } = this.state;
    const inputsArray = Object.entries(inputs);

    return (
      <form onSubmit={this.handleLoginSubmit}>
        {inputsArray.map(([inputName, inputValue], index) => {
          const inputType =
            inputName.toLowerCase() === "password" ? "password" : "text";

          return (
            <div className="form-group" key={index}>
              <label htmlFor={inputName}>{inputName}</label>
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type={inputType}
                value={inputValue}
                name={inputName}
                placeholder={inputName}
                aria-describedby={`${inputName}`}
                aria-labelledby={`${inputName}`}
                aria-label={`${inputName}`}
                id={inputName}
                required
                min="1"
              />
            </div>
          );
        })}
        <small className="form-text">
          {!firebaseLoginUserError ? null : <p>{firebaseLoginUserError}</p>}
        </small>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
