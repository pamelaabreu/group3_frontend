import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pushRotate as Menu } from "react-burger-menu";
import "./Navbar.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";

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
    <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
      <Link to="/">
        <img src={BundleLogo} width="150" height="150" alt="Bundle" />
      </Link>
      <Link to="/">Home</Link>
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
