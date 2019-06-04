import React from "react";
import countries from "i18n-iso-countries";
import { parsePhoneNumber, ParseError } from "libphonenumber-js";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const ItineraryCategory = props => {
  const { category, trip } = props;
  let phoneNumber = "";
  const countryCode = countries.getAlpha2Code(trip.country, "en");

  try {
    phoneNumber = parsePhoneNumber(`+ ${category.phone_number}`, countryCode);
  } catch (error) {
    if (error instanceof ParseError) {
      console.log("error", error.message);
    } else {
      throw error;
    }
  }

  return (
    <div className="card-body">
      <p className="card-title">{category.name}</p>
      <p className="card-text">Address: {category.address}</p>
      <p className="card-text">
        Phone:{" "}
        {countryCode === "US"
          ? phoneNumber.formatNational()
          : phoneNumber.formatInternational()}
      </p>
      <p className="card-text">{category.note}</p>
    </div>
  );
};

export default ItineraryCategory;
