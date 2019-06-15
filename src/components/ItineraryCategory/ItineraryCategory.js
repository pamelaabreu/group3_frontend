import React from "react";
import countries from "i18n-iso-countries";
import { parsePhoneNumber, ParseError } from "libphonenumber-js";
import "./ItineraryCategory.css";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const ItineraryCategory = props => {
  const { category, trip } = props;
  let phoneNumber = "";
  const countryCode = countries.getAlpha2Code(trip.country, "en");

  console.log(category);
  try {
    phoneNumber = parsePhoneNumber(`+ ${category.phone_number}`, countryCode);
  } catch (error) {
    if (error instanceof ParseError) {
      console.log("error", error.message);
      phoneNumber = category.phone_number;
    } else {
      phoneNumber = category.phone_number;
    }
  }

  console.log(category);
  return (
    <>
      <div className="itinerary-category-card-header">
        <img
          src={require(`../../assets/images/itinerary-categories/${
            category.itinerary_name
          }.svg`)}
          alt=""
          className="itinerary-card-header-img"
        />
        <h4 className="card-header-title font-weight-bold align-self-center">
          {category.name}
        </h4>
      </div>
      <div className="itinerary-card-body">
        <ul className="card-body">
          <p className="card-text">Address: {category.address}</p>
          <p className="card-text">
            Phone:{` ${category.phone_number}`}
            {/*countryCode === "US"
          ? phoneNumber.formatNational()
  : phoneNumber.formatInternational()*/}
          </p>
          <p className="card-text">{category.note}</p>
        </ul>
      </div>
    </>
  );
};

export default ItineraryCategory;
