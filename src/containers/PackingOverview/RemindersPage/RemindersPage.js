import React, { useState, useEffect } from "react";
import axios from "axios";
import NoLists from "./NoLists/NoLists";
import AddListButton from "./AddListCard/AddListCard";
import ListCard from "./ListCard/ListCard";
import BASE_URL from "../../../services/backendUrlConnect";
import TodoListView from "./TodoListView/TodoListView";
import "./RemindersPage.css";

const RemindersPage = props => {
  const {
    lists,
    updateLists,
    trip_id,
    selectedList,
    handleSelectList,
    handleAddTodo,
    todoList,
    todoListId,
    shoppingList,
    shoppingListId,
    handleCompleteTodo
  } = props;

  const [alertDisplay, setAlertDisplay] = useState(false);
  const [currentListDisplay, setCurrentListDisplay] = useState(true);
  const [todoInput, setTodoInput] = useState("");
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const createList = () => {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].list_type === selectedList) {
        setAlertDisplay(true);
        return;
      }
    }
    axios({
      method: "post",
      url: BASE_URL + "/todolist/",
      data: {
        name: "",
        trip_id,
        list_type: selectedList
      }
    })
      .then(res => {
        updateLists();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCurrentListDisplay = bool => {
    setCurrentListDisplay(bool);
  };

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
