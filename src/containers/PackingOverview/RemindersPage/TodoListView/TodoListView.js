import React from "react";
import Todo from "../Todo/Todo";

const TodoListView = ({ todoList, handleCompleteTodo, handleDeleteTodo }) => {
  return (
    <div className="row">
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
    </div>
  );
};

export default TodoListView;
