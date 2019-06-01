import axios from "axios";
import BASEURL from "./backendUrlConnect";

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
