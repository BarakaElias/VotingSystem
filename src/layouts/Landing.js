import React from "react";
import { Outlet } from "react-router-dom";
import bg from "./../assets/img/lavenderbg.jpg";
import bg_blue from "./../assets/img/bluebg.jpg";

import Main from "../components/Main";

const Landing = ({ children }) => (
  <Main style={{ backgroundImage: `url(${bg_blue})` }}>
    <div>
      {children}
      <Outlet />
    </div>
  </Main>
);

export default Landing;
