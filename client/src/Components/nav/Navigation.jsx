import React from "react";
import NavStyle from "./style/nav.css";
import IconLinks from "../../IconLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
const Navigation = () => {
  const [menuStyle, setMenuStyle] = useState("-100%");

  const openMenu = () => {
    setMenuStyle("0%");
  };
  const closeMenu = () => {
    setMenuStyle("-100%");
  };

  // used to toggle search bar..
  const [activeSearch, setActiveSearch] = useState("false");
  const [searchClass, setsearchClass] = useState("main-search-bar");
  const activeSearchBtn = () => {
    setActiveSearch(!activeSearch);
    activeSearch
      ? setsearchClass("main-search-bar active")
      : setsearchClass("main-search-bar");
  };

  const nav = useNavigate();
  const [key, setKey] = useState();
  const search = () => {
    nav("/Search/" + key);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const win = window.sessionStorage;
  const Logout = (e) => {
    e.preventDefault();
    if (win.getItem("UID") != null) {
      const UID = win.getItem("UID");
      axios.get(`http://localhost:3002/getBilling/${UID}`).then((res) => {
        if (res.data != "" && res.data != null) {
          if (res.data[0].Users > 0) {
            let users = res.data[0].Users - 1;
            axios.post(`http://localhost:3002/updatePayment/${UID}/${users}`);
          }
        }
      });
      win.clear();
      removeCookie("UID");
      nav("/Explore");
    } else {
      nav("/Auth");
    }
  };

  const [AuthTXT, setAuthTXT] = useState("Sign In");
  const checkLogin = () => {
    if (win.getItem("UID") != null) {
      setAuthTXT("Logout");
    }
  };
  const stayLogin = () => {
    if (cookies.UID != null) {
      console.log("cookie uid=", cookies.UID);
      win.setItem("UID", cookies.UID);
    } else {
      console.log("no cookie");
    }
  };

  useEffect(() => {
    stayLogin();
    checkLogin();
  }, []);

  return (
    <nav style={NavStyle}>
      <div className="nav-container">
        <a href="/" className="logo">
          <h1>ANIME</h1>
        </a>
        <div className={searchClass}>
          <form action="" onSubmit={search}>
            <input
              required
              type="text"
              placeholder="Search anime.."
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <button className="search-btn">
              <img src={IconLinks.black_search} alt="" />
            </button>
          </form>
        </div>

        <div className="right-side">
          <div className="burger" onClick={openMenu}>
            <div className="line l1"></div>
            <div className="line l2"></div>
            <div className="line l3"></div>
          </div>
          <button
            style={{ display: activeSearch ? "block" : "none" }}
            onClick={activeSearchBtn}
          >
            <img src={IconLinks.search} alt="" />
          </button>
          <div
            style={{ display: activeSearch ? "none" : "block" }}
            onClick={activeSearchBtn}
            className="close"
          >
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
        </div>
        <div
          onBlur={closeMenu}
          style={{ right: menuStyle }}
          className="nav-bar"
        >
          <div className="close-btn" onClick={closeMenu}>
            <div className="line l1"></div>
            <div className="line l2"></div>
          </div>
          <div className="logo">
            <h1>ANIME</h1>
          </div>
          <div className="search-bar">
            <form action="">
              <input
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                type="text"
                placeholder="Search anime.."
              />

              <button onClick={search} className="search-btn">
                <img src={IconLinks.black_search} alt="" />
              </button>
            </form>
          </div>
          <div className="genre">
            <p className="nav-title">GENRE</p>
            <ul>
              <li>
                <a href="http://localhost:3000/Genre/Shoujo">
                Shoujo
                  <div className="genre-line"></div>
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/Genre/Shounen">
                  Shounen
                  <div className="genre-line"></div>
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/Genre/Seinen">
                  Seinen
                  <div className="genre-line"></div>
                </a>
              </li>
              <li>
                <a href="http://localhost:3000/Genre/Isekai">
                  Isekai
                  <div className="genre-line"></div>
                </a>
              </li>{" "}
              <li>
                <a href="http://localhost:3000/Genre/Slice of life">
                  Slice of life
                  <div className="genre-line"></div>
                </a>
              </li>
            </ul>
          </div>

          <ul className="nav-list">
            <li>
              <a href="/WatchList" className="nav-title">
                Watch List
              </a>
            </li>

            <li>
              <a href="/Plans" className="nav-title">
                Plans
              </a>
            </li>
            <li>
              <a href="/News" className="nav-title">
                News
              </a>
            </li>
            <li>
              <a href="/Chats" className="nav-title">
                Chat
              </a>
            </li>

            <li>
              <a href="/AccountSettings" className="nav-title">
                Account Settings
              </a>
            </li>
            <li>
              <a
                onClick={Logout}
                style={{ color: "red", cursor: "pointer" }}
                className="nav-title"
              >
                {AuthTXT}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="search">
        <img src={IconLinks.search} alt="search icon" />
      </div> */}
    </nav>
  );
};

export default Navigation;
