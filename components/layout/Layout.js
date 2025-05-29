import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
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
        {status==="authenticated"?<button className="logout--first" onClick={logoutHandler}>Logout<FiLogOut/></button>:null}
        {status==="authenticated"?<button className="logout--second" onClick={logoutHandler}><FiLogOut/></button>:null}
      </header>
      <div className="container--main">
        <Sidebar/>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
