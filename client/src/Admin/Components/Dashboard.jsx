import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import style from "./Style/Dashboard/Dashboard.css";
import addImg from "../../Resources/Icons/Admin add.png";
import viewImg from "../../Resources/Icons/Admin View.png";
import deleteImg from "../../Resources/Icons/deleteImg.png";
import IconsLinks from "../../IconLinks";
import axios from "axios";
import { useNavigate } from "react-router";
function Dashboard() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  const [userCount, setuserCount] = useState();
  const [animeCount, setanimeCount] = useState();
  const [revenue, setrevenue] = useState();
  const [basicPlan, setbasicPlan] = useState();
  const [standardPlan, setstandardPlan] = useState();
  const [premiumPlan, setpremiumPlan] = useState();

  const [shounen, setshounen] = useState();
  const [seinen, setseinen] = useState();
  const [isekai, setisekai] = useState();
  const [shoujo, setshoujo] = useState();
  const [sliceOfLife, setsliceOfLife] = useState();

  const win = window.sessionStorage;
  const nav = useNavigate();
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };

  const logout = () => {
    win.removeItem("AdminUID");

    nav("/adminauth");
  };

  const getData = () => {
    checkForLogin();

    axios.get("http://localhost:3002/getTotalUsers").then((res) => {
      setuserCount(res.data[0].userCount);
    });

    axios.get("http://localhost:3002/getTotalAnime").then((res) => {
      setanimeCount(res.data[0].animeCount);
    });
    axios.get("http://localhost:3002/getTotalRevenue").then((res) => {
      setrevenue(res.data[0].revenue);
    });

    //! basic plan
    axios.get("http://localhost:3002/getBasicPlanCount").then((res) => {
      setbasicPlan(res.data[0].plan);
    });

    //! standard plan
    axios.get("http://localhost:3002/getStandardPlanCount").then((res) => {
      setstandardPlan(res.data[0].plan);
    });
    //! premium plan
    axios.get("http://localhost:3002/getPremiumPlanCount").then((res) => {
      setpremiumPlan(res.data[0].plan);
    });

    axios.get("http://localhost:3002/getGenreCount/'Shounen'").then((res) => {
      setshounen(res.data[0].genre);
    });

    axios.get("http://localhost:3002/getGenreCount/'Seinen'").then((res) => {
      setseinen(res.data[0].genre);
    });

    axios.get("http://localhost:3002/getGenreCount/'Isekai'").then((res) => {
      setisekai(res.data[0].genre);
    });

    axios.get("http://localhost:3002/getGenreCount/'Shoujo'").then((res) => {
      setshoujo(res.data[0].genre);
    });

    axios
      .get("http://localhost:3002/getGenreCount/'Slice of life'")
      .then((res) => {
        setsliceOfLife(res.data[0].genre);
      });
  };

  const [userDetailsCls, setuserDetailsCls] = useState(false);
  const UserDetails = () => {
    setuserDetailsCls(!userDetailsCls);
  };

  const [animeDetailsCls, setanimeDetailsCls] = useState(false);
  const AnimeDetails = () => {
    setanimeDetailsCls(!animeDetailsCls);
  };

  useEffect(() => {
    getData();

    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <section className="dashboard" style={style}>
      <p className="logo">ANIME</p>
      <div className="tracker">
        <div className="left">
          <ul>
            <li onClick={UserDetails}>
              <h1 style={{ color: "#FF0000" }}>
                {userCount < 10 ? "0" + userCount : userCount}
              </h1>
              <p>Users</p>
            </li>

            <li onClick={AnimeDetails}>
              <h1 style={{ color: "#4F6CFF" }}>
                {animeCount < 10 ? "0" + animeCount : animeCount}
              </h1>
              <p>Anime</p>
            </li>

            <li>
              <h1>₹{revenue}</h1>
              <p>Revenue</p>
            </li>
          </ul>
        </div>
        <div className="right">
          <p className="clock">
            {(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
              ":" +
              (date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes())}
          </p>
        </div>
      </div>
      <div className="op">
        <ul>
          <li>
            <a href="http://localhost:3000/addAnime">
              <div className="img-container">
                <img src={addImg} alt="" />
                <p>Add Anime</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/addEpisode">
              <div className="img-container">
                <img src={addImg} alt="" />
                <p>Add Episode</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/addEpisode">
              <div s className="img-container">
                <img src={deleteImg} alt="" />
                <p>View Episodes</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/animeList">
              <div className="img-container">
                <img src={viewImg} alt="" />
                <p>View Anime</p>
              </div>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="http://localhost:3000/AddNews">
              <div className="img-container">
                <img src={addImg} alt="" />
                <p>Add News</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/DeleteNews">
              <div s className="img-container">
                <img src={deleteImg} alt="" />
                <p>View News</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/ListAnimeCat">
              <div s className="img-container">
                <img src={viewImg} alt="" />
                <p>ListAnimeCat</p>
              </div>
            </a>
          </li>

          <li>
            <a href="http://localhost:3000/userList">
              <div s className="img-container">
                <img src={viewImg} alt="" />
                <p>userList</p>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <a style={{ display: "none" }} href="">
          <img src={IconsLinks.settings} alt="" />
        </a>
        <a onClick={logout} className="logout">
          <img src={IconsLinks.logout} alt="" />
          Logout
        </a>
      </div>

      <div className={userDetailsCls ? "user-details active" : "user-details"}>
        <div onClick={UserDetails} className="close-btn">
          <img src={IconsLinks.close} alt="" />
        </div>
        <div className="container">
          <div className="banner"></div>

          <div className="card-grp">
            <div className="card">
              <h3 style={{ color: "orange" }}>Basic Plan</h3>
              <h1>{basicPlan}</h1>
              <p>users who have basic plan</p>
            </div>
            <div className="card">
              <h3 style={{ color: "#4F6CFF" }}>Standard Plan</h3>
              <h1>{standardPlan}</h1>
              <p>users who have Standard plan</p>
            </div>
            <div className="card">
              <h3 style={{ color: "#FF0000" }}>Premium Plan</h3>
              <h1>{premiumPlan}</h1>
              <p>users who have Premium plan</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={animeDetailsCls ? "anime-details active" : "anime-details"}
      >
        <div onClick={AnimeDetails} className="close-btn">
          <img src={IconsLinks.close} alt="" />
        </div>
        <div className="container">
          <div className="banner"></div>
          <div className="card-grp">
            <div className="card">
              <h3 style={{ color: "orange" }}>Shonen</h3>
              <h1>{shounen}</h1>
              <p>Anime in Shonen Genre </p>
            </div>
            <div className="card">
              <h3 style={{ color: "#4F6CFF" }}>Seinen</h3>
              <h1>{seinen}</h1>
              <p>Anime in Seinen Genre </p>
            </div>
            <div className="card">
              <h3 style={{ color: "#FF0000" }}>Isekai</h3>
              <h1>{isekai}</h1>
              <p>Anime in Isekai Genre </p>
            </div>
            <div className="card">
              <h3 style={{ color: "green" }}>Shoujo</h3>
              <h1>{shoujo}</h1>
              <p>Anime in Shoujo Genre </p>
            </div>
            <div className="card">
              <h3 style={{ color: "purple" }}>Slice of life</h3>
              <h1>{sliceOfLife}</h1>
              <p>Anime in Slice of life Genre</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi praesentium explicabo libero assumenda culpa magnam quaerat corporis? Quod, soluta eligendi, debitis iure ea amet tempore veniam dolorem molestiae repudiandae laboriosam at placeat a minus rerum fugit nihil ad ducimus, ipsum officiis ullam illum magni ex facere! Nostrum vitae quos non.

export default Dashboard;
