import axios from "axios";
import { randomTripNameGenerator, splitDestination } from "./suggestions";
import BASE_URL from "./backendUrlConnect.js";

const createTrip = (
  destination,
  departureDate,
  returnDate,
  user_uid = null
) => {
  let temp = splitDestination(destination);
  let name = randomTripNameGenerator(temp.city);

  return axios({
    method: "post",
    url: BASE_URL + "/trip/",
    data: {
      name,
      city: temp.city,
      country: temp.country,
      departure_date: departureDate,
      return_date: returnDate,
      user_uid
    }
  });
};

const createBag = (trip_id, type_id) => {
  return axios({
    method: "post",
    url: BASE_URL + "/bag/",
    data: {
      trip_id,
      type_id
    }
  });
};

const buildBundle = (
  items,
  destination,
  departureDate,
  returnDate,
  user_uid = null
) => {
  let trip_id = null;
  return createTrip(destination, departureDate, returnDate, user_uid)
    .then(({ data: { id } }) => {
      trip_id = id;
      const personal = createBag(id, 1);
      const carry_on = createBag(id, 2);
      const checked = createBag(id, 3);
      return Promise.all([personal, carry_on, checked]);
    })
    .then(
      ([
        {
          data: { id: personal_id }
        },
        {
          data: { id: carry_on_id }
        },
        {
          data: { id: checked_id }
        }
      ]) => {
        const promiseArr = itemPromises(
          items,
          personal_id,
          carry_on_id,
          checked_id
        );
        return Promise.all(promiseArr);
      }
    )
    .then(() => {
      return trip_id;
    })
    .catch(err => {
      console.log(err);
    });
};

const createItem = (name, quantity, category_id, bag_id, packed = false) => {
  return axios({
    method: "post",
    url: BASE_URL + "/items/",
    data: {
      name,
      quantity,
      bag_id,
      category_id,
      packed
    }
  });
};

const itemPromises = (items, personal_id, carry_on_id, checked_id) => {
  const categories = Object.keys(items);
  const promiseArr = [];
  const categoryObj = {
    clothing: 1,
    accessories: 2,
    electronics: 3,
    personals: 4,
    documents: 5,
    "first-aid": 6,
    essentials: 7,
    children: 8,
    misc: 4
  };
  for (let category of categories) {
    for (let e of items[category]) {
      if (e.pack) {
        if (e.bag_type === "personal")
          promiseArr.push(
            createItem(e.name, e.quantity, categoryObj[e.category], personal_id)
          );
        if (e.bag_type === "carry-on")
          promiseArr.push(
            createItem(e.name, e.quantity, categoryObj[e.category], carry_on_id)
          );
        if (e.bag_type === "checked")
          promiseArr.push(
            createItem(e.name, e.quantity, categoryObj[e.category], checked_id)
          );
      }
    }
  }
  return promiseArr;
};

export { createTrip, buildBundle };
