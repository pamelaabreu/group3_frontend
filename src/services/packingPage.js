const addToDelete = (name, index, toDelete, displayBag, currentBag) => {
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

export { addToDelete };
