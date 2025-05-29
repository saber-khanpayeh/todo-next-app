import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TiArrowSortedUp } from "react-icons/ti";
import { VscListSelection } from "react-icons/vsc";

function Sidebar() {
  const [mobileBtn, setMobileBtn] = useState(0);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  useEffect(() => {
    const getWidth = () => document.documentElement.clientWidth;

    const handleResize = () => {
      const newWidth = getWidth();
      if (newWidth < 800) {
        setMobileBtn(1);
      } else {
        setMenu(true);
        setMobileBtn(0);
      }
    };
    handleResize(); //run for first time
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <>
      {!menu && mobileBtn ? (
        <div className="mobile-btn">
          <button  onClick={() => setMenu((menu) => !menu)}>
            <IoMenu />
          </button>
        </div>
      ) : null}
      {menu ? (
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li className={pathname === "/" ? "selected" : null}>
              <VscListSelection />
              <Link href="/">Todos</Link>
            </li>
            <li className={pathname === "/add-todo" ? "selected" : null}>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li
              className={
                pathname === "/profile" || pathname === "/edit-profile"
                  ? "selected"
                  : null
              }
            >
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
          {mobileBtn ? (
            <div className="close-menu">
              <button onClick={() => setMenu(false)}>
                <TiArrowSortedUp />
              </button>
            </div>
          ) : null}
        </aside>
      ) : null}
    </>
  );
}

export default Sidebar;
