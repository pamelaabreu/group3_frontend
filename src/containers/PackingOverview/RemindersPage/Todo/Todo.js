import React from "react";

const Todo = props => {
  const { task_name, index, value, handleDeleteTodo } = props;

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {task_name}
        <span
          onClick={() => handleDeleteTodo(index, value)}
          className="badge badge-primary badge-pill"
        >
          X
        </span>
      </li>
    </ul>
  );
};

export default Todo;
