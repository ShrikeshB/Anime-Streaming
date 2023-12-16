import React  from 'react';
import { useState } from "react";
import axios from "axios";
import style from "./style/AdminStyle.css";

//! components here..
import SideNav from "./Components/SideNav";
import AddAnime from "./Components/AddAnime";

const Admin = () => {


  return (
    <div className="admin-container" style={style}>

      <SideNav />
      <div className="blocker"></div>
      <AddAnime />
    </div>
  );
};

export default Admin;
