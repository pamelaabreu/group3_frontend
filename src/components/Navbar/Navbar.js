import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { pushRotate as Menu } from "react-burger-menu";
import "./Navbar.css";
import BundleLogo from "../../assets/images/logo/bundle_logo.svg";

// Pages
import ShowLoginOrSignup from "../../containers/ShowLoginOrSignup/ShowLoginOrSignup";

// Context
import FirebaseAuthContext from "../../context/FirebaseAuth";

const Navbar = props => {
  const [menuOpen, setMenuOpen] = useState(false);

  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  const UserLogout = () => {
    FirebaseUserAuth.logoutUser();
    props.history.push("/");
    closeMenu();
  };

  // This can is used to close the menu, e.g. when a user clicks a menu item
  const closeMenu = () => setMenuOpen(false);

  // This keeps state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  const handleStateChange = state => setMenuOpen(state.isOpen);

  return (
    <Menu
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      isOpen={menuOpen}
      onStateChange={state => handleStateChange(state)}
    >
      <Link onClick={closeMenu} to="/">
        <img src={BundleLogo} width="150" height="150" alt="Bundle" />
      </Link>
      <Link onClick={closeMenu} to="/">
        Home
      </Link>
      <Link onClick={closeMenu} to="packHacks">
        Pack Hacks
      </Link>
      <Link onClick={closeMenu} to="/tsaGuides">
        TSA Guides
      </Link>
      <Link onClick={closeMenu} to="/about">
        About
      </Link>

      {!FirebaseUserAuth.user ? (
        <ShowLoginOrSignup closeMenu={closeMenu} />
      ) : (
        <button onClick={UserLogout}>Logout</button>
      )}
    </Menu>
  );
};

export default Navbar;
