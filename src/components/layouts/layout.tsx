import React from "react";

import "./layout.scss";
import { Header } from "./header";
import Footer from "./footer";

export const Layout = (props) => {
  return (
    <div className="layout-wrapper flex flex-col pt-60 md:pt-80 lg:pt-90 w-full">
      <div />
      <Header balance={props.balance} />
      {props.children}
      <Footer></Footer>
    </div>
  );
};
