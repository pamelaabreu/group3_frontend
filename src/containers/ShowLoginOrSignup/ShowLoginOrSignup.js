import React, { useState } from "react";

// Pages
import Signup from "../../containers/Signup/Signup";
import Login from "../../containers/Login/Login";

const ShowLoginOrSignup = props => {
  const { closeMenu, openMenu } = props;
  const [showLoginOrSignup, setLoginOrSignup] = useState(true);

  return (
    <>
      <button onClick={() => setLoginOrSignup(true)}>Login</button>
      <button onClick={() => setLoginOrSignup(false)}>Signup</button>
      <div>
        {showLoginOrSignup ? (
          <Login closeMenu={closeMenu} openMenu={openMenu} />
        ) : (
          <Signup closeMenu={closeMenu} openMenu={openMenu} />
        )}
      </div>
    </>
  );
};

export default ShowLoginOrSignup;
