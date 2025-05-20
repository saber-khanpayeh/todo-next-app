import { useRouter } from "next/router";
import React from "react";
import { MdFormatListBulletedAdd } from "react-icons/md";

function EmptyTodo({todoType}) {
  const router = useRouter();
  const routeHandler = () => {
    router.push(`/add-todo?status=${todoType}`)
  };
  return (
    <div className="home-page__empty">
      <button className="btn"onClick={routeHandler}>
        <MdFormatListBulletedAdd />
      </button>
    </div>
  );
}

export default EmptyTodo;
