import React, { useState, useEffect } from "react";
import axios from "axios";
import NoReminders from "./NoReminders/NoReminders";
import AddListButton from "./AddListButton/AddListButton";
import ListCard from "./ListCard/ListCard";
import AddItemButton from "./AddItemButton/AddItemButton";
import BASE_URL from "../../../services/backendUrlConnect";
import ShoppingItem from "../../../components/SuggestedItem/SuggestedItem";
import Todo from "./Todo/Todo";

const RemindersPage = props => {
  const {
    lists,
    updateLists,
    trip_id,
    selectedList,
    handleSelectList,
    bag_id
  } = props;

  const [todoList, setTodoList] = useState([]);
  const [todoListId, setTodoListId] = useState(null);
  const [shoppingListId, setShoppingListId] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(lists, "lists");
    console.log("selected", selectedList);
    if (!lists.length) return;
    for (let list of lists) {
      getList(list);
    }
  }, [lists]);

  useEffect(() => {
    console.log(shoppingList, "s list");
    console.log(shoppingListId, "s id");
    console.log(todoList, "tdl");
    console.log(todoListId, "tdl id");
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + "/todolist/todo/" + lists.todolist_id
    })
      .then(data => {
        console.log(data);
        setTodos(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [todoList, shoppingList]);

  const createList = () => {
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].list_type === selectedList) {
        setAlertDisplay(true);
        return;
      }
    }
    axios({
      method: "post",
      url: "http://localhost:5000/todolist/",
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
      url: "http://localhost:5000/todolist/" + todolist_id + "/all"
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

  const handleOnChange = e => {
    setItemInput(e.target.value);
  };

  // const handleTodoToggle = () => {

  // }

  const handleCreateItem = () => {
    if (itemInput.trim() === "") return;
    let item = itemInput.trim();

    axios({
      method: "post",
      url: BASE_URL + "/items/",
      data: {
        name: item,
        packed: false,
        quantity: 1,
        bag_id,
        category_id: 9
      }
    })
      .then(({ data: id }) => {
        console.log(id);
        setItemInput("");
        shoppingList.push({
          name: item,
          pack: false,
          image: "https://www.jcrew.com/s7-img-facade/L4012_PA6511?fmt=jpeg"
        });
        setShoppingList(shoppingList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {lists.length !== 0 ? (
        <h4 className="ml-3">Here's your todos:</h4>
      ) : (
        <NoReminders />
      )}
      <div className="container">
        <div className="row">
          <div className="justify-content-around">
            <AddListButton
              createList={createList}
              handleSelectList={handleSelectList}
              alertDisplay={alertDisplay}
            />
            <div className="row ml-3">
              {lists.map((e, i) => {
                return <ListCard {...e} key={i} list_count={5} />;
              })}
            </div>
          </div>
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
              Shopping List
            </a>
            <button
              className="btn btn-primary ml-2"
              type="button"
              data-toggle="collapse"
              data-target="#multiCollapseExample2"
              aria-expanded="false"
              aria-controls="multiCollapseExample2"
            >
              Todo List
            </button>
          </p>
          <div className="row">
            <div className="col">
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample3"
              >
                <div className="card card-body">Shopping todos</div>
              </div>
            </div>
            <div className="col">
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample2"
              >
                <div className="card card-body">
                  {todoList.map(e => {
                    return <Todo task_name={e.task_name} key={e.id} />;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-2">
            <AddItemButton
              itemInput={itemInput}
              handleOnChange={handleOnChange}
              handleCreateItem={handleCreateItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RemindersPage;
