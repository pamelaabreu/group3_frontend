import React from "react";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";
import "./TodoListView.css";

const TodoListView = ({
  todoList,
  handleCompleteTodo,
  handleDeleteTodo,
  todoInput,
  handleTodoInputChange,
  addTodo,
  height
}) => {
  const height75 = Math.floor(height * 0.75);
  let incompleteCount = 0;
  const incompleteTodos = todoList.map((e, i, a) => {
    let t = a[a.length - 1 - i];
    if (t.complete === false) {
      incompleteCount += 1;
      return (
        <div className="todo" key={i}>
          <Todo
            task_name={t.task_name}
            index={a.length - 1 - i}
            value={t.id}
            handleCompleteTodo={handleCompleteTodo}
            handleDeleteTodo={handleDeleteTodo}
            complete={t.complete}
          />
        </div>
      );
    }
    return null;
  });

  let completedCount = 0;
  const completedTodos = todoList.map((e, i, a) => {
    let t = a[a.length - 1 - i];
    if (t.complete === true) {
      completedCount += 1;
      return (
        <div className="todo" key={i}>
          <Todo
            task_name={t.task_name}
            index={a.length - 1 - i}
            value={t.id}
            handleDeleteTodo={handleDeleteTodo}
            complete={t.complete}
          />
        </div>
      );
    }
    return null;
  });

  return (
    <>
      <div
        className="todo-list-view"
        style={{ height: height75 + "px", maxHeight: height75 + "px" }}
      >
        <div className="ml-2 bg-bundleBlue c-white rounded">
          <a
            className="col-8 btn c-white"
            data-toggle="collapse"
            href="#multiCollapseExample3"
            role="button"
            aria-expanded="false"
            aria-controls="multiCollapseExample3"
          >
            <div className="row justify-content-between">
              <span>To Be Completed</span>
              <span>{incompleteCount} items left</span>
            </div>
          </a>
        </div>
        <div className="col">
          <div
            className="collapse show multi-collapse"
            id="multiCollapseExample3"
          >
            <div className="">{incompleteTodos}</div>
          </div>
        </div>

        <button
          className="col-8 btn bg-smokeGrey c-white ml-2 rounded"
          type="button"
          data-toggle="collapse"
          data-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
        >
          <div className="row justify-content-between">
            <span>Completed</span>
            <span>{completedCount} items</span>
          </div>
        </button>

        <div className="col">
          <div
            className="collapse show multi-collapse"
            id="multiCollapseExample2"
          >
            <div className="">{completedTodos}</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <AddTodo
          todoInput={todoInput}
          handleTodoInputChange={handleTodoInputChange}
          addTodo={addTodo}
        />
      </div>
    </>
  );
};

export default TodoListView;
