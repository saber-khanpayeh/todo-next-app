import React, { useState } from "react";
import { BsAlignStart } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import RadioButton from "../element/RadioButton";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDone, MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const addHandler = async () => {
    const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title,status }),
        headers: { "Content-Type": "application/json" },
      });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo created!");
    }
  };
  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
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
        <button onClick={addHandler}>Add</button>
      </div>
    </div>
  );
}

export default AddTodoPage;
