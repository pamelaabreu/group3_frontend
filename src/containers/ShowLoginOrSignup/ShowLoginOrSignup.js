import React, { useState } from "react";

// Pages
import Signup from "../../containers/Signup/Signup";
import Login from "../../containers/Login/Login";

const ShowLoginOrSignup = props => {
  const { closeMenu } = props;
  const [showLoginOrSignup, setLoginOrSignup] = useState(true);

  return (
    <>
      <button onClick={() => setLoginOrSignup(true)}>Login</button>
      <button onClick={() => setLoginOrSignup(false)}>Signup</button>
      <div>
        {showLoginOrSignup ? (
          <Login closeMenu={closeMenu} />
        ) : (
          <Signup closeMenu={closeMenu} />
        )}
      </div>
    </>
  );
};

export default ShowLoginOrSignup;
