import React from "react";

const PackHacksCard = ({ title, tipNumber, imgURL, description }) => {
  return (
    <div className="b-radius9 card border-0 mx-2 my-4 col-12 col-md-5 col-lg-5 p-0 ds-lightGrey">
      <div className="card-body">
        <img src={imgURL} alt={title} className="card-img-top p-3" />
        <h1 className="c-denimBlue mali900 m-5">
          #{tipNumber} {title}
        </h1>
        <p className="card-text c-denimBlue h3 m-5">{description}</p>
      </div>
    </div>
  );
};

export default PackHacksCard;
