import React from "react";
import "./Todo.css";

const Todo = props => {
  const {
    task_name,
    index,
    value,
    handleCompleteTodo,
    handleDeleteTodo,
    complete
  } = props;

  const completed = <i className="far fa-check-circle c-bundleBlue" />;
  const incomplete = (
    <i
      className="far fa-circle c-bundleBlue"
      onClick={() => handleCompleteTodo(index, value)}
    />
  );

  return (
    <ul className="list-group">
      <li className="px-0 list-group-item d-flex">
        <div className="col-12 row justify-content-between no-gutters">
          <div className="col-1 text-center">
            <i
              className="far fa-trash-alt c-bundleBlue"
              onClick={() => handleDeleteTodo(index, value)}
            />
          </div>
          <div className="col-8 c-bundleBlue mali300">{task_name}</div>
          <div className="col-1 text-right">
            {complete === false ? incomplete : completed}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Todo;
