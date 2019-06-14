import React from "react";

const ListCard = props => {
  const {
    list_type,
    name,
    handleCurrentListDisplay,
    completedTodos,
    incompleteTodos
  } = props;
  const bool = list_type === "To Do List" ? true : false;
  let totalTodos = completedTodos + incompleteTodos;
  let percentage = Math.floor((completedTodos / totalTodos) * 100);

  return (
    <div className="col-4 m-3 card p-0 rounded">
      <button
        className="card-body rounded"
        onClick={() => handleCurrentListDisplay(bool)}
      >
        <h5 className="card-title">{list_type}</h5>
        <p className="card-text">
          <span>{name}</span>
        </p>
        <p>{completedTodos ? percentage + "%" : null}</p>
      </button>
    </div>
  );
};

export default ListCard;
