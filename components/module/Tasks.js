import { useRouter } from "next/router";
import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { RiMastodonLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

function Tasks({ data, fetchTodos, next, back }) {
  const router = useRouter();
  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };
  const editHandler = (id) => {
    router.push(`edit-todo/${id}`);
  };
  return (
    <div className="tasks">
      {data?.map((task) => (
        <div key={task._id} className="tasks__card">
          <div className="tasks__card--top">
            <button onClick={()=>editHandler(task._id)}>
              <TbEdit />
            </button>
            <button>
              <LuTrash2 />
            </button>
          </div>
          <span className={task.status}></span>
          <RiMastodonLine />
          <h4>{task.title}</h4>
          <div className="tasks__card--bottom">
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(task._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(task._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
