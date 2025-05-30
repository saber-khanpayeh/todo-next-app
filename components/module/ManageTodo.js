import React, { useEffect, useState } from "react";
import { BsAlignStart } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDone, MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";
import RadioButton from "../element/RadioButton";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";

function ManageTodo({ page, data }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: false,
    hideProgressBar: true,
  };
  useEffect(() => {
    if (router.pathname === "/add-todo") {
      const { status } = router.query;
      if (status) setStatus(status);
    }
  }, [router]);
  useEffect(() => {
    if (page === "edit" && data) {
      setTitle(data.title);
      setStatus(data.status);
    }
  }, [data]);

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo created!",toastOptions);
    }
  };
  const editHandler = async () => {
    const req = await fetch(`/api/todos/edit/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await req.json();
    if (response.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo edit successfull!",toastOptions);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };
  return (
    <div className="add-form">
      {data ? (
        <h2>
          <FaRegEdit />
          Edit Todo
        </h2>
      ) : (
        <h2>
          <GrAddCircle />
          Add New Todo
        </h2>
      )}

      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todo"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        {data ? (
          <button onClick={editHandler}>Edit</button>
        ) : (
          <button onClick={addHandler}>Add</button>
        )}
      </div>
    </div>
  );
}

export default ManageTodo;
