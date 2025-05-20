import React, { useEffect, useState } from "react";
import Tasks from "../module/Tasks";
import { TbNotesOff } from "react-icons/tb";
import { MdFormatListBulletedAdd } from "react-icons/md";
import EmptyTodo from "../element/EmptyTodo";

function HomePage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    console.log(data);
    if (data.status === "success") setTodos(data.data.todos);
  };
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        {todos.todo ? (
          <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
        ) : (
          <EmptyTodo todoType="todo" />
        )}
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        {todos.inProgress ? (
          <Tasks
            data={todos.inProgress}
            fetchTodos={fetchTodos}
            next="review"
            back="todo"
          />
        ) : (
          <EmptyTodo todoType="inProgress" />
        )}
      </div>
      <div className="home-page--review">
        <p>Review</p>
        {todos.review ? (
          <Tasks
            data={todos.review}
            fetchTodos={fetchTodos}
            next="done"
            back="inProgress"
          />
        ) : (
          <EmptyTodo todoType="review" />
        )}
      </div>
      <div className="home-page--done">
        <p>Done</p>
        {todos.done ? (
          <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />
        ) : (
          <EmptyTodo todoType="done" />
        )}
      </div>
    </div>
  );
}

export default HomePage;
