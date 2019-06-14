import React, { useState } from "react";
import NoLists from "./NoLists/NoLists";
import TodoListView from "./TodoListView/TodoListView";
import "./RemindersPage.css";

const RemindersPage = props => {
  const {
    lists,
    handleAddTodo,
    todoList,
    handleCompleteTodo,
    handleDeleteTodo,
    currentListDisplay,
    height
  } = props;

  const [todoInput, setTodoInput] = useState("");

  const handleTodoInputChange = e => {
    setTodoInput(e.target.value);
  };

  const addTodo = e => {
    if (todoInput.trim() === "") return;
    handleAddTodo(todoInput);
    setTodoInput("");
  };

  return (
    <>
      {lists.length === 0 ? (
        <>
          <NoLists />
        </>
      ) : null}

      {lists.length === 1 ? (
        <>
          <div className="container">
            <div className="row justify-content-around">
              {
                // PROGRESS BAR HERE}
              }
            </div>
          </div>
          {currentListDisplay ? (
            <TodoListView
              todoList={todoList}
              handleCompleteTodo={handleCompleteTodo}
              handleDeleteTodo={handleDeleteTodo}
              todoInput={todoInput}
              handleTodoInputChange={handleTodoInputChange}
              addTodo={addTodo}
              height={height}
            />
          ) : null}
        </>
      ) : null}

      {lists.length === 2 ? (
        <>
          <div className="container">
            <div className="row justify-content-between">
              {
                // PROGRESS BAR HERE}
              }
            </div>
          </div>
          {currentListDisplay ? (
            <TodoListView
              todoList={todoList}
              handleCompleteTodo={handleCompleteTodo}
              handleDeleteTodo={handleDeleteTodo}
              todoInput={todoInput}
              handleTodoInputChange={handleTodoInputChange}
              addTodo={addTodo}
              height={height}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default RemindersPage;
