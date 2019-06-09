import React from "react";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";

const TodoListView = ({
  todoList,
  handleCompleteTodo,
  handleDeleteTodo,
  todoInput,
  handleTodoInputChange,
  addTodo
}) => {
  return (
    <>
      <div className="ml-2">
        <a
          className="col-4 btn btn-outline-primary text-left"
          data-toggle="collapse"
          href="#multiCollapseExample3"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample3"
        >
          To Be Completed
        </a>
      </div>

      <div className="col">
        <div
          className="collapse show multi-collapse"
          id="multiCollapseExample3"
        >
          <div className="">
            {todoList.map((e, i, a) => {
              let t = a[a.length - 1 - i];
              if (t.complete === false) {
                return (
                  <Todo
                    task_name={t.task_name}
                    key={i}
                    index={a.length - 1 - i}
                    value={t.id}
                    handleCompleteTodo={handleCompleteTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    complete={t.complete}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <button
        className="col-4 btn btn-outline-primary ml-2 text-left"
        type="button"
        data-toggle="collapse"
        data-target="#multiCollapseExample2"
        aria-expanded="false"
        aria-controls="multiCollapseExample2"
      >
        Completed
      </button>

      <div className="col">
        <div className="collapse multi-collapse" id="multiCollapseExample2">
          <div className="">
            {todoList.map((e, i, a) => {
              let t = a[a.length - 1 - i];
              if (t.complete === true) {
                return (
                  <Todo
                    task_name={t.task_name}
                    key={i}
                    index={a.length - 1 - i}
                    value={t.id}
                    handleDeleteTodo={handleDeleteTodo}
                    complete={t.complete}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div>
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
