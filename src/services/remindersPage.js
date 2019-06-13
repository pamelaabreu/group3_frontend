import axios from "axios";
import BASE_URL from "./backendUrlConnect";

export const fetchLists = async lists => {
  if (!lists.length) return;
  let obj = {
    shoppingList: { shoppingList: null, shoppingListId: null },
    todoList: { todoList: null, todoListId: null }
  };

  for (let list of lists) {
    let listData = await getList(list);

    try {
      if (list.list_type === "Shopping List") {
        obj["shoppingList"] = listData;
      } else {
        obj["todoList"] = listData;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return obj;
};

const getList = list => {
  const { list_type, todolist_id } = list;
  const key = list_type === "To Do List" ? "todoList" : "shoppingList";

  return axios({
    method: "get",
    url: BASE_URL + "/todolist/" + todolist_id + "/all"
  })
    .then(({ data: listData }) => {
      return { [key + "Id"]: todolist_id, [key]: listData };
    })
    .catch(err => {
      return err;
    });
};

/*

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

*/

export const addTodo = (todoInput, state) => {
  const { todoListId, todoList } = state;
  let data = {
    task_name: todoInput,
    complete: false,
    todolist_id: todoListId
  };

  return axios({
    method: "post",
    url: BASE_URL + "/todolist/todo/",
    data
  })
    .then(({ data: { id } }) => {
      let newTodoList = [...todoList];
      data.id = id;
      newTodoList.push(data);
      return { todoList: newTodoList };
    })
    .catch(err => {
      console.log(err);
      if (err) return null;
    });
};

export const completeTodo = (index, todo_id, state) => {
  const { todoList } = state;

  let copiedTodoList = [...todoList];
  return axios
    .put(BASE_URL + "/todolist/todo/" + todo_id, {
      id: todo_id,
      complete: true
    })
    .then(() => {
      copiedTodoList[index].complete = true;
      return { todoList: copiedTodoList };
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

//   const handleDeleteTodo = (index, todo_id) => {
//     let copiedTodoList = [...todoList];
//     copiedTodoList = copiedTodoList
//       .slice(0, index)
//       .concat(copiedTodoList.slice(index + 1));

//     axios
//       .delete(BASE_URL + "/todolist/todo/" + todo_id)
//       .then(() => {
//         setTodoList(copiedTodoList);
//       })
//       .catch(err => console.log(err));
//   };
