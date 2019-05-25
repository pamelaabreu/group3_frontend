import React from 'react';

class Login extends React.Component {
    state = {
        inputs: {
          email: "",
          password: ""
        }
      };

    render () {
        const { inputs } = this.state;
        const inputsArray = Object.entries(inputs);

        return (
            <form>
                {inputsArray.map(([inputName, inputValue], index) => {
                    const inputType =
                        inputName.toLowerCase() === "password" ? "password" : "text";

                    return (
                        <input
                        key={index}
                        type={inputType}
                        value={inputValue}
                        name={inputName}
                        placeholder={inputName}
                        required
                        min='1'
                        />
                    );
                })}
                <button type='submit'>Login</button>
            </form>
        );
    }
}

export default Login;