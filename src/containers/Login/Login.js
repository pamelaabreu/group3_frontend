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
        
        return (
            <form>
                
            </form>
        );
    }
}

export default Login;