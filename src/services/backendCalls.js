import axios from "axios";
import { randomTripNameGenerator, splitDestination } from "./suggestions";
import BASE_URL from "./backendUrlConnect.js";

const buildBundle = (
  items,
  destination,
  departureDate,
  returnDate,
  user_uid = null
) => {
  let temp = splitDestination(destination);
  let name = randomTripNameGenerator(temp.city);
  return axios({
    method: "post",
    url: BASE_URL + "/trip/v2",
    data: {
      name,
      city: temp.city,
      country: temp.country,
      departure_date: departureDate,
      return_date: returnDate,
      user_uid,
      items
    }
  })
    .then(({ data: { trip_id } }) => {
      return trip_id;
    })
    .catch(err => {
      console.log("ERROR CREATING TRIP");
      return "";
    });
};

export { buildBundle };
