import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditTodoPage from "../../components/template/EditTodoPage";


function EditTodo() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const {
    query: { todoId },
    isReady,
  } = router;
  useEffect(() => {
    if (!isReady || !todoId) return;
    // console.log(todoId);
    fetch(`/api/todos/edit/${todoId}`)
      .then((res) => res.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, [isReady,todoId]);
   //console.log(data);
   if(data)
  return <EditTodoPage page="edit" data={data} />;
}

export default EditTodo;
