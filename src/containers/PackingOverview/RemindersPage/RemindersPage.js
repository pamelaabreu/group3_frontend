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
    handleAddTodo(todoInput);
    setTodoInput("");
  };

  const handleDeleteTodo = (index, todo_id) => {
    let copiedTodoList = [...todoList];
    copiedTodoList = copiedTodoList
      .slice(0, index)
      .concat(copiedTodoList.slice(index + 1));

    axios
      .delete(BASE_URL + "/todolist/todo/" + todo_id)
      .then(() => {
        setTodoList(copiedTodoList);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {lists.length === 0 ? (
        <>
          <NoLists />
          <div className="col-3">
            <AddListButton
              createList={createList}
              handleSelectList={handleSelectList}
              alertDisplay={alertDisplay}
            />
          </div>
        </>
      ) : null}

      {lists.length === 1 ? (
        <>
          <div className="container">
            <div className="row justify-content-around">
              {
                // PROGRESS BAR HERE}
              }
              {lists.map((e, i) => {
                return (
                  <ListCard
                    key={i}
                    {...e}
                    currentListDisplay={currentListDisplay}
                    handleCurrentListDisplay={handleCurrentListDisplay}
                  />
                );
              })}
              <div className="col-3">
                <AddListButton
                  createList={createList}
                  handleSelectList={handleSelectList}
                  alertDisplay={alertDisplay}
                />
              </div>
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
              {lists.map((e, i) => {
                return (
                  <ListCard
                    key={i}
                    {...e}
                    currentListDisplay={currentListDisplay}
                    handleCurrentListDisplay={handleCurrentListDisplay}
                    list_count={todoList.length}
                  />
                );
              })}
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
