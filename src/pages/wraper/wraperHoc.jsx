import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import classes from "./wraper.module.scss";
import { Main } from "../../components/main/Main";

const wrapperHoc = (Component) => {
  return (props) => {
    //const { user, logout } = userData();
    //const modal = useModal();

    return (
      <div>
        <Navbar />
        <Main>
          <Component />
        </Main>
      </div>
    );
  };
};

export default wrapperHoc;
