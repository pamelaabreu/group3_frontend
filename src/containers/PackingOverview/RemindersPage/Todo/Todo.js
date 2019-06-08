import React from "react";

const Todo = props => {
  const {
    task_name,
    index,
    value,
    handleCompleteTodo,
    handleDeleteTodo,
    complete
  } = props;

  const completed = <i className="far fa-check-circle" />;
  const incomplete = (
    <i
      className="far fa-circle"
      onClick={() => handleCompleteTodo(index, value)}
    />
  );

  return (
    <ul className="list-group">
      <li className="px-0 list-group-item d-flex">
        <div className="col-12 row justify-content-between no-gutters">
          <div className="col-2 text-center">
            <i
              className="far fa-trash-alt"
              onClick={() => handleDeleteTodo(index, value)}
            />
          </div>
          <div className="col-8">{task_name}</div>
          <div className="col-2 text-right">
            {complete === false ? incomplete : completed}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Todo;
