import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";

function Tasks({ data,fetchTodos,next,back }) {
    const changeStatus=async(id,status)=>{
        const res=await fetch("/api/todos",{
            method:"PATCH",
            body:JSON.stringify({id,status}),
            headers:{"Content-Type":"application/json"},
        });
        const data=await res.json();
        if(data.status==="success")fetchTodos();
    }
  return (
    <div className="tasks">
      {data?.map((task) => (
        <div key={task._id} className="tasks__card">
            <span className={task.status}></span>
            <RiMastodonLine/>
            <h4>{task.title}</h4>
            <div>
                {back?<button className="button-back" onClick={()=>changeStatus(task._id,back)}><BiLeftArrow/>Back</button>:null}
                {next?<button className="button-next" onClick={()=>changeStatus(task._id,next)}>Next<BiRightArrow/></button>:null}
            </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
