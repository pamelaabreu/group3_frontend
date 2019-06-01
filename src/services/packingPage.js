import axios from "axios";
import BASEURL from "./backendUrlConnect";

export const mountPacking = async (bagTypes, bags) => {
  const allBagPromise = [];
  for (let bag of bags) {
    allBagPromise.push(
      axios({
        method: "get",
        url: `${BASEURL}/bag/${bag.bag_id}/all`
      })
    );
  }
  try {
    const allBags = await Promise.all(allBagPromise);
    const addToState = {};
    let displayBag = "";
    let totalItems = 0;
    let totalPacked = 0;
    for (let i = 0; i < allBags.length; i++) {
      const { data: items } = allBags[i];
      const { trip_id, bag_id, type_id } = bags[i];
      const key = `${bagTypes[type_id].slice(0, 2)}${trip_id}${bag_id}`;
      if (bagTypes[type_id] === "Personal") displayBag = key;
      addToState[key] = items;
      totalItems += items.length;
      let count = items.reduce((a, e) => {
        if (e.packed) a += 1;
        return a;
      }, 0);
      totalPacked += count;
    }
    return { ...addToState, displayBag, totalItems, totalPacked };
  } catch (err) {
    return null;
  }
};

export const addToDelete = (name, index, toDelete, displayBag, currentBag) => {
  const item_id = currentBag[index].item_id;
  let newToDelete = toDelete;
  if (name === "item" || name === "unpack") {
    const inToDelete = toDelete.indexOf(item_id);
    if (inToDelete > -1) {
      currentBag[index].toBeDeleted = false;
      newToDelete = toDelete
        .slice(0, inToDelete)
        .concat(toDelete.slice(inToDelete + 1));
    } else {
      currentBag[index].toBeDeleted = true;
      toDelete.push(item_id);
    }
  }
  return { toDelete: newToDelete, [displayBag]: currentBag };
};

export const executeDelete = async (
  currentBag,
  toDelete,
  displayBag,
  totalItems,
  totalPacked
) => {
  const deleteQueue = [];
  // fill queue array with api calls of what is going to be deleted
  for (let item_id of toDelete) {
    deleteQueue.push(
      axios({
        method: "delete",
        url: BASEURL + "/items/" + item_id
      })
    );
  }
  try {
    // if successful
    const res = await Promise.all(deleteQueue);
    console.log("delete resulte: ", res);
    let removedFromPacked = 0;
    // loop through the current bag in the front end and remove each item
    for (let item_id of toDelete) {
      for (let i = 0; i < currentBag.length; i++) {
        if (item_id === currentBag[i].item_id) {
          if (currentBag[i].packed) removedFromPacked += 1;
          currentBag = currentBag.slice(0, i).concat(currentBag.slice(i + 1));
          break;
        }
      }
    }
    // update the totalItems to reflect removed items
    const newTotalItems = totalItems - toDelete.length;
    const newTotalPacked = totalPacked - removedFromPacked;
    // set deleteMode to false, update the current bag, empty toDelete array, and update the totalItems
    return {
      deleteMode: false,
      [displayBag]: currentBag,
      toDelete: [],
      totalItems: newTotalItems,
      totalPacked: newTotalPacked
    };
  } catch (err) {
    // if unsuccessful
    // empty toDelete and exity deleteMode
    console.log("Delete failed");
    for (let item of currentBag) {
      if (item.toBeDeleted) {
        item.toBeDeleted = false;
      }
    }
    return {
      deleteMode: false,
      toDelete: [],
      [displayBag]: currentBag
    };
  }
};

export const unpack = (index, displayBag, totalPacked, items) => {
  items[index].selected = !items[index].selected;
  items[index].packed = false;
  axios({
    method: "put",
    url: BASEURL + "/items/" + items[index].id,
    data: {
      packed: items[index].packed
    }
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => {
      console.log("ERROR PACKING ITEM IN THE BACK END!");
    });
  const newTotalPacked = totalPacked - 1;
  return {
    [displayBag]: items,
    totalPacked: newTotalPacked
  };
};

export const markImportant = (index, displayBag, items) => {
  items[index].important = !items[index].important;
  axios({
    method: "put",
    url: BASEURL + "/items/" + items[index].id,
    data: {
      important: items[index].important
    }
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => {
      console.log("ERROR PACKING ITEM IN THE BACK END!");
    });
  return {
    [displayBag]: items
  };
};
