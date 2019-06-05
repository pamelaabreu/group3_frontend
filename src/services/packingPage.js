import axios from "axios";
import BASEURL from "./backendUrlConnect";

export const mountPacking = async (bagTypes, bags, lists) => {
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
    let list_id = checkForShoppingList(lists);
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
    return { ...addToState, displayBag, totalItems, totalPacked, list_id };
  } catch (err) {
    return null;
  }
};

export const addToDelete = (name, index, state) => {
  const { toDelete, displayBag } = state;
  const currentBag = state[displayBag];
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

export const executeDelete = async state => {
  const { toDelete, displayBag, totalItems, totalPacked } = state;
  // grab the current bag we are deleting from, and create a queue array
  let currentBag = state[displayBag];
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
    console.log("Delete: ", res[0].statusText);
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

export const unpack = (index, state) => {
  const { displayBag, totalPacked } = state;
  const items = state[displayBag];
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
      // console.log(data);
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

export const markImportant = (index, state) => {
  const { displayBag } = state;
  const items = state[displayBag];
  if (!items || items.length === 0) return null;
  items[index].important = !items[index].important;
  axios({
    method: "put",
    url: BASEURL + "/items/" + items[index].id,
    data: {
      important: items[index].important
    }
  })
    .then(({ data }) => {
      // console.log(data);
    })
    .catch(err => {
      console.log("ERROR PACKING ITEM IN THE BACK END!");
    });
  return {
    [displayBag]: items
  };
};

export const select = (index, state) => {
  const { displayBag, totalPacked } = state;
  const items = state[displayBag];
  if (!items || items.length === 0) return null;
  items[index].selected = !items[index].selected;
  items[index].packed = true;
  axios({
    method: "put",
    url: BASEURL + "/items/" + items[index].id,
    data: {
      packed: items[index].packed
    }
  })
    .then(({ data }) => {
      // console.log(data);
    })
    .catch(err => {
      console.log("ERROR PACKING ITEM IN THE BACK END!");
    });
  const newTotalPacked = totalPacked + 1;
  return {
    [displayBag]: items,
    totalPacked: newTotalPacked
  };
};

export const closeLastQuantity = state => {
  const { displayBag, lastInputIndex } = state;
  const items = state[displayBag];
  if (!items || items.length === 0) return null;
  if (lastInputIndex !== null) {
    const val =
      items[lastInputIndex].quantity < 1 ||
      items[lastInputIndex].quantity === ""
        ? 1
        : items[lastInputIndex].quantity;
    items[lastInputIndex].quantity = val;
    items[lastInputIndex].modifyQuant = false;
    return {
      [displayBag]: items
    };
  }
};

export const quantity = (index, e, keyPress, state) => {
  const { displayBag } = state;
  const items = state[displayBag];
  // const { items } = this.state;
  if (!items || items.length === 0) return null;
  if (keyPress) {
    const val = e.target.value < 1 ? 1 : e.target.value;
    items[index].quantity = val;
    items[index].modifyQuant = false;
  } else {
    items[index].modifyQuant = !items[index].modifyQuant;
  }
  axios({
    method: "put",
    url: BASEURL + "/items/" + items[index].id,
    data: {
      quantity: items[index].quantity
    }
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => {
      console.log("ERROR PACKING ITEM IN THE BACK END!");
    });
  return {
    [displayBag]: items,
    lastInputIndex: index
  };
};

export const createItem = async state => {
  const { itemInput, displayBag } = state;
  const currentBag = state[displayBag];
  if (currentBag.length === 0 || currentBag.length === undefined) return null;
  const bag_id = state[displayBag][0].bag_id;
  if (itemInput.trim() === "") return null;
  let item = itemInput.trim();
  try {
    const {
      data: { id }
    } = await axios({
      method: "post",
      url: BASEURL + "/items/",
      data: {
        name: item,
        packed: false,
        quantity: 1,
        bag_id,
        category_id: 9
      }
    });
    currentBag.push({
      bag_id: bag_id,
      category_id: 3,
      flag_id: null,
      id: 1031,
      image: null,
      important: false,
      item_id: id,
      name: item,
      packed: false,
      quantity: 1,
      type_id: 9
    });
    return { itemInput: "", [displayBag]: currentBag };
  } catch (err) {
    console.log("Error creating item");
  }
};

export const inputChange = (name, index, e, state) => {
  if (name === "quantity") {
    const { displayBag } = state;
    const items = state[displayBag];
    const val = e.target.value < 1 ? "" : e.target.value;
    items[index].quantity = val;
    return {
      [displayBag]: items
    };
  }
  return null;
};

export const findOrCreateShoppingCart = async (index, state, lists) => {
  const { displayBag } = state;
  const item = state[displayBag][index];
  if (state.list_id) return state.list_id;
  const list_id = checkForShoppingList(lists);
  if (list_id) {
    console.log("List exists, its id: ", list_id);
    return list_id;
  } else {
    try {
      console.log("No list exists, creating new one");
      const {
        data: { id }
      } = await axios({
        method: "post",
        url: BASEURL + "/todolist/",
        data: {
          name: "",
          trip_id: item.trip_id,
          list_type: "Shopping List"
        }
      });
      return id;
    } catch (err) {
      console.log("failed to create shopping list");
      return null;
    }
  }
};

const checkForShoppingList = lists => {
  console.log("checking for shopping list");
  for (let list of lists) {
    if (list.list_type === "Shopping List") return list.id;
  }
  return null;
};

export const addToShoppingCart = async (index, state, list_id) => {
  const { displayBag } = state;
  const updateParent = state.list_id === null ? true : false;
  const item = state[displayBag][index];
  console.log("adding item to shopping cart");
  const createTodo = axios({
    method: "post",
    url: BASEURL + "/todolist/todo/",
    data: {
      task_name: item.name,
      complete: false,
      item_id: item.id,
      todolist_id: list_id
    }
  });
  const shopify = axios({
    method: "put",
    url: BASEURL + "/items/" + item.id,
    data: {
      shop: true
    }
  });

  try {
    console.log("item added to shopping cart");
    const [
      {
        data: { id }
      }
    ] = await Promise.all([createTodo, shopify]);
    const currentBag = state[displayBag];
    currentBag[index].shop = true;
    currentBag[index].todo_id = id;
    console.log("these are its current stats: ", currentBag[index]);
    return {
      newState: {
        [displayBag]: currentBag,
        list_id
      },
      updateParent
    };
  } catch (err) {
    console.log("ERROR ADDING ITEM TO SHOPPING LIST");
    return false;
  }
};
