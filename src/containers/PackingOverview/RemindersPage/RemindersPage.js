import React, { useState, useEffect } from "react";
import axios from "axios";
import NoReminders from "./NoReminders/NoReminders";
import AddListButton from "./AddListCard/AddListCard";
import ListCard from "./ListCard/ListCard";
import BASE_URL from "../../../services/backendUrlConnect";
import AddTodo from "./AddTodo/AddTodo";
import TodoListView from "./TodoListView/TodoListView";

const RemindersPage = props => {
  const { lists, updateLists, trip_id, selectedList, handleSelectList } = props;

  const [todoList, setTodoList] = useState([]);
  const [todoListId, setTodoListId] = useState(null);
  const [shoppingListId, setShoppingListId] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [currentListDisplay, setCurrentListDisplay] = useState(true);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    console.log(lists, "lists");
    if (!lists.length) return;
    for (let list of lists) {
      getList(list);
    }
  }, [lists]);

  useEffect(() => {}, [shoppingList, shoppingListId]);

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
        console.log("list created");
        updateLists();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getList = list => {
    const { list_type, todolist_id } = list;

    axios({
      method: "get",
      url: BASE_URL + "/todolist/" + todolist_id + "/all"
    })
      .then(({ data: listData }) => {
        if (list_type === "Shopping List") {
          setShoppingList(listData);
          setShoppingListId(todolist_id);
        } else {
          setTodoList(listData);
          setTodoListId(todolist_id);
        }
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
    let data = {
      task_name: todoInput,
      complete: false,
      todolist_id: todoListId
    };

    axios({
      method: "post",
      url: BASE_URL + "/todolist/todo/",
      data
    })
      .then(({ data: { id } }) => {
        let newTodoList = [...todoList];
        data.id = id;
        console.log(id, "ID");
        newTodoList.push(data);
        setTodoList(newTodoList);
        setTodoInput("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCompleteTodo = (index, todo_id) => {
    let copiedTodoList = [...todoList];
    axios
      .put(BASE_URL + "/todolist/todo/" + todo_id, {
        id: todo_id,
        complete: true
      })
      .then(() => {
        copiedTodoList[index].complete = true;
        setTodoList(copiedTodoList);
      })
      .catch(err => console.log(err));
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
      {lists.length !== 0 ? (
        <h4 className="ml-3">Here's your todos:</h4>
      ) : (
        <NoReminders />
      )}
      <div className="container">
        <div className="row justify-content-between">
          {lists.map((e, i) => {
            return (
              <div key={i} className="col-4">
                <ListCard
                  {...e}
                  handleCurrentListDisplay={handleCurrentListDisplay}
                  list_count={5}
                />
              </div>
            );
          })}
          {lists.length === 2 ? null : (
            <div className="col-3">
              <AddListButton
                createList={createList}
                handleSelectList={handleSelectList}
                alertDisplay={alertDisplay}
              />
            </div>
          )}
        </div>
        <div className="">
          <p>
            <a
              className="btn btn-primary"
              data-toggle="collapse"
              href="#multiCollapseExample3"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample3"
            >
              To Be Completed
            </a>
            <button
              className="btn btn-primary ml-2"
              type="button"
              data-toggle="collapse"
              data-target="#multiCollapseExample2"
              aria-expanded="false"
              aria-controls="multiCollapseExample2"
            >
              Completed
            </button>
          </p>
          {currentListDisplay ? (
            <TodoListView
              todoList={todoList}
              handleCompleteTodo={handleCompleteTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          ) : (
            <div className="row">
              <div className="col">
                <div
                  className="collapse multi-collapse"
                  id="multiCollapseExample3"
                >
                  <h5>Shopping list stuff</h5>
                </div>
              </div>
              <div className="col">
                <div
                  className="collapse multi-collapse"
                  id="multiCollapseExample2"
                >
                  <h5>More Shopping list stuff</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AddTodo
        todoInput={todoInput}
        handleTodoInputChange={handleTodoInputChange}
        addTodo={addTodo}
      />
    </>
  );
};

export default RemindersPage;
