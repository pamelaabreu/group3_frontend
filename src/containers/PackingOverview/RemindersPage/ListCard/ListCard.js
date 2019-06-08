import React from "react";

const ListCard = props => {
  const { list_type, name, handleCurrentListDisplay, list_count } = props;
  const bool = list_type === "To Do List" ? true : false;
  return (
    <div className="card mx-1 mt-2 p-0 pack--bag-width">
      <button
        className="card-body row"
        onClick={() => handleCurrentListDisplay(bool)}
      >
        <h5 className="card-title">{list_type}</h5>
        <p className="card-text">
          <span>{name}</span>
        </p>
        <p>
          <span>{list_count} todos</span>
        </p>
      </button>
    </div>
  );
};

export default ListCard;
