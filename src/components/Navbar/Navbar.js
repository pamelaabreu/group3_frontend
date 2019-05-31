import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pushRotate as Menu } from "react-burger-menu";
import "./Navbar.css";

// Pages
import ShowLoginOrSignup from "../../containers/ShowLoginOrSignup/ShowLoginOrSignup";

// Context
import FirebaseAuthContext from "../../context/FirebaseAuth";

const Navbar = props => {
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  const UserLogout = () => {
    FirebaseUserAuth.logoutUser();
    props.history.push("/");
  };

  return (
    <Menu>
      {/* <Link to="/">
        <div className="bundleNavbarLogo">Logo</div>
      </Link> */}
      <Link className="menu-item" to="/">
        Home
      </Link>
      <Link to="packHacks">Pack Hacks</Link>
      <Link to="/tsaGuides">TSA Guides</Link>
      <Link to="/about">About</Link>
      {!FirebaseUserAuth.user ? (
        <ShowLoginOrSignup />
      ) : (
        <button onClick={UserLogout}>Logout</button>
      )}
    </Menu>
  );
};

export default Navbar;
