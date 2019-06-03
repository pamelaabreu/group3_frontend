import React, { useState, useEffect } from "react";
import axios from "axios";
import NoReminders from "./NoReminders/NoReminders";
import AddListButton from "./AddListButton/AddListButton";
import ListCard from "./ListCard/ListCard";
import AddItemButton from "./AddItemButton/AddItemButton";
import BASE_URL from "../../../services/backendUrlConnect";
import ShoppingItem from "../../../components/SuggestedItem/SuggestedItem";

const RemindersPage = props => {
  const {
    lists,
    updateLists,
    trip_id,
    selectedList,
    handleSelectList,
    bag_id
  } = props;

  const [todoList, setTodoList] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [itemInput, setItemInput] = useState("");

  useEffect(() => {
    console.log("lists", lists);
    if (!lists.length) return;
    for (let list of lists) {
      getList(list);
    }
  }, [lists]);

  const createList = () => {
    if (lists.list_type === "Todo List" || "Shopping List") {
      setAlertDisplay(true);
    } else {
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
    }
  };

  const getList = list => {
    axios({
      method: "get",
      url: "http://localhost:5000/todolist/" + list.todolist_id + "/all"
    })
      .then(({ data: listData }) => {
        if (list.list_type === "Shopping List") setShoppingList(listData);
        else setTodoList(listData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOnChange = e => {
    setItemInput(e.target.value);
  };

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
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {lists.length ? (
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
        <div className="row">
          <div className="mt-3 accordion col-8" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Todo List
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="m-3 card-body">Todos</div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Shopping List
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="m-3 card-body">Shopping todos</div>
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
