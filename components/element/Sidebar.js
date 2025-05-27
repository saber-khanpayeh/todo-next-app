import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { VscListSelection } from "react-icons/vsc";

function Sidebar() {
    const router=useRouter();
    const pathname=router.pathname;
  return (
    <ul>
      <li className={pathname==="/"?"selected":null}>
        <VscListSelection />
        <Link href="/">Todos</Link>
      </li>
      <li className={pathname==="/add-todo"?"selected":null}>
        <BiMessageSquareAdd />
        <Link href="/add-todo">Add Todo</Link>
      </li>
      <li className={pathname==="/profile"||pathname==="/edit-profile"?"selected":null}>
        <RxDashboard />
        <Link href="/profile">Profile</Link>
      </li>
    </ul>
  );
}

export default Sidebar;
