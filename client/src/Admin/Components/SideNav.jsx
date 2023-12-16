import React  from 'react';
import { Link } from "react-router-dom";
import Img from "../../Resources/Images/851512.png";

//! style..
import style from "./Style/SideNav/SideNav.css";

function SideNav(props) {
  return (
    <>
      <div style={style} className="Sidenav-container">
        <div className="profile">
          <div className="img-container">
            <img src={Img} alt="" />
          </div>
          <p>Hi Admin</p>
        </div>

        <div className="menu">
          <ul>
            <li
              className={
                // used to active the respective nav link
                props.active == "Dashboard" ? "Dashboard active" : "Dashboard"
              }
            >
              <Link to="/Dashboard" href="">
                Dashboard
              </Link>
            </li>
            <li
              className={
                // used to active the respective nav link
                props.active == "AddAnime" ? "AddAnime active" : "AddAnime"
              }
            >
              <Link to="/AddAnime">Add Anime</Link>
            </li>
            <li
              className={
                // used to active the respective nav link
                props.active == "AddEpisode"
                  ? "AddEpisode active"
                  : "AddEpisode"
              }
            >
              <Link to="/AddEpisode">Add Episode</Link>
            </li>
            <li
              className={
                // used to active the respective nav link
                props.active == "AnimeList" ? "AnimeList active" : "AnimeList"
              }
            >
              <Link to="/AnimeList">Anime List</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideNav;
