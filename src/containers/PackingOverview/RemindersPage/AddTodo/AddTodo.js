import React from "react";
import { suggested_todos } from "../../../../services/todos";
import "./AddTodo.css";

const AddTodo = props => {
  const { todoInput, handleTodoInputChange, addTodo } = props;

  return (
    <div className="btn dropup">
      <button
        type="button"
        className="px-2 py-1 rounded-circle bg-denimBlue"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-plus c-white" />
      </button>
      <div className="px-2 dropdown-menu">
        <label htmlFor="todo-input">
          What's todo?
          <input
            id="todo-input"
            type="text"
            maxLength="50"
            value={todoInput}
            onChange={handleTodoInputChange}
            list="datalist2"
          />
        </label>
        <datalist id="datalist2">
          <option defaultValue>Choose one...</option>
          {suggested_todos.map((e, i) => {
            return (
              <option value={e} key={i}>
                {e}
              </option>
            );
          })}
        </datalist>
        <button
          className="btn-sm border-info border-radius"
          type="submit"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
