import React from "react";

const AddTodo = props => {
  const { todoInput, handleTodoInputChange, addTodo } = props;

  return (
    <div className="btn-group dropup">
      <button
        type="button"
        className="px-2 py-1 rounded-circle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-plus" />
      </button>
      <div className="px-2 dropdown-menu">
        <label>
          What's todo?
          <textarea
            maxLength="50"
            value={todoInput}
            onChange={handleTodoInputChange}
          />
        </label>
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
