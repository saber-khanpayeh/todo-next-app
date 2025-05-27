import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { VscListSelection } from "react-icons/vsc";
import Sidebar from "../element/Sidebar";

function Layout({children}) {
  const {status}=useSession();
  const logoutHandler=()=>{
    signOut();
  }
  return (
    <div className="container">
      <header>
        <p>Planno App</p>
        {status==="authenticated"?<button onClick={logoutHandler}>Logout<FiLogOut/></button>:null}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <Sidebar/>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
