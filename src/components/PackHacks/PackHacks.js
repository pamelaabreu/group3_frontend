import React from "react";
import PackHacksCard from "../PackHacksCard/PackHacksCard";
import PackHacksJSON from "../../assets/json/packHacks";
import "./PackHacks.css";

const PackHacks = () => {
  const PackHacksKeys = Object.keys(PackHacksJSON);

  const PackHacksCardRender = PackHacksKeys.map((keyname, index) => {
    const title = keyname;
    const tipNumber = index + 1;
    const imgURL = PackHacksJSON[keyname].imgURL;
    const description = PackHacksJSON[keyname].description;
    return (
      <PackHacksCard
        key={index}
        title={title}
        tipNumber={tipNumber}
        imgURL={imgURL}
        description={description}
      />
    );
  });

  return (
    <div className="bg-bundleBlueBabyBlue min-vh-100 min-vw-100 container">
      <header className="row p-5 justify-content-center">
        <h1 className="c-white mali900 display-3 text-center mt-5 pt-5">
          Pack Hacks
        </h1>
      </header>

      <div className="row justify-content-center">
        <div className="packHacks-cardContainer p-5">{PackHacksCardRender}</div>
      </div>
    </div>
  );
};

export default PackHacks;
