import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { VscListSelection } from "react-icons/vsc";

function Layout({children}) {
  const {status}=useSession();
  const logoutHandler=()=>{
    signOut();
  }
  return (
    <div className="container">
      <header>
        <p>Test Todo App</p>
        {status==="authenticated"?<button onClick={logoutHandler}>Logout<FiLogOut/></button>:null}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li>
                <VscListSelection/>
              <Link href="/">Todos</Link>
            </li>
            <li>
                <BiMessageSquareAdd/>
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
                <RxDashboard/>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
