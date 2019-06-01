import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = props => {
  return (
    <div className="fullScreen">
      <div className="fullScreenInnerBlock">
        <img
          src="https://media.giphy.com/media/d7nbVpR6n9rwiGUNBf/giphy.gif"
          className="spinningLoading hueRotate pb-5"
          alt="Loading..."
        />
        <h1 className="colorWhite">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
