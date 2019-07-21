import React from "react";
import PackHacksCard from "../PackHacksCard/PackHacksCard";

const PackHacks = () => {
  return (
    <div className="bg-bundleBlueBabyBlue min-vh-100 min-vw-100">
      <header className="container p-5">
        <h1 className="c-white mali900 display-3 text-center">Pack Hacks</h1>
      </header>

      <div className="container overflow-auto m-5 p-5">
        <PackHacksCard />
      </div>
    </div>
  );
};

export default PackHacks;
