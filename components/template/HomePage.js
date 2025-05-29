import React, { useEffect, useState } from "react";
import Tasks from "../module/Tasks";
import { TbNotesOff } from "react-icons/tb";
import { MdFormatListBulletedAdd } from "react-icons/md";
import EmptyTodo from "../element/EmptyTodo";
import Loading from "../element/Loading";

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [catchData,setCatchData]=useState("");
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    console.log(data);
    setCatchData(data.status);
    if (data.status === "success") setTodos(data.data.todos);
  };
  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        {!catchData &&<Loading/>}
        {todos.todo ? (
          <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
        ) : (
          catchData?<EmptyTodo todoType="todo" />:null
        )}
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        {!catchData &&<Loading/>}
        {todos.inProgress ? (
          <Tasks
            data={todos.inProgress}
            fetchTodos={fetchTodos}
            next="review"
            back="todo"
          />
        ) : (
          catchData?<EmptyTodo todoType="inProgress" />:null
        )}
      </div>
      <div className="home-page--review">
        <p>Review</p>
        {!catchData &&<Loading/>}
        {todos.review ? (
          <Tasks
            data={todos.review}
            fetchTodos={fetchTodos}
            next="done"
            back="inProgress"
          />
        ) : (
          catchData?<EmptyTodo todoType="review" />:null
        )}
      </div>
      <div className="home-page--done">
        <p>Done</p>
        {!catchData &&<Loading/>}
        {todos.done ? (
          <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />
        ) : (
          catchData?<EmptyTodo todoType="done" />:null
        )}
      </div>
    </div>
  );
}

export default HomePage;
