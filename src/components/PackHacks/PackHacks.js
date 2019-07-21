import React from "react";
import PackHacksCard from "../PackHacksCard/PackHacksCard";
import PackHacksJSON from "../../assets/json/packHacks";

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
    <div className="bg-bundleBlueBabyBlue min-vh-100 min-vw-100">
      <header className="container p-5">
        <h1 className="c-white mali900 display-3 text-center">Pack Hacks</h1>
      </header>

      <div className="container overflow-auto m-5 p-5">
        {PackHacksCardRender}
      </div>
    </div>
  );
};

export default PackHacks;
