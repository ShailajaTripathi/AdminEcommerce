import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = () => {

  return (
    <>
      <Header/>
      <main className="web-site-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
