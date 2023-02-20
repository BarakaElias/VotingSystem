import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
// import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import logo from "../../assets/img/logo.png";
// import logo from "../../../public/sema-icon.png";

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            {/* <Logo /> <span className="align-middle me-3">Afya Awards</span> */}
            <div className="d-flex justify-content-space-around">
              {/* <img src={logo} alt="Afya Awards logo" /> */}
              <span className="align-right me-3">
                Afya Awards Voting System
              </span>
            </div>
            {/* <img src={logo} alt="logo" /> */}
          </a>

          <SidebarNav items={items} />
          {/* {!!showFooter && <SidebarFooter />} */}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
