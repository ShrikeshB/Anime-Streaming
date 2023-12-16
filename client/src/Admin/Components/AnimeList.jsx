//! Library
import React from "react";
import axios from "axios";

//! Components
import SideNav from "./SideNav";

//! style
import style from "./Style/AnimeList/AnimeList.css";
import Card from "../Components/Card";
import { useEffect } from "react";
import { useState } from "react";
import IconsLinks from "../../IconLinks";
import { useNavigate, useParams } from "react-router";
function AnimeList() {
  const [cardData, setCardData] = useState([]);
  const win = window.sessionStorage;
  const nav = useNavigate();
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };

  const { key } = useParams();
  const GetCardData = async () => {
    checkForLogin();
    if (key != null) {
      axios
        .get(`http://localhost:3002/getAnimeData/${key}`)
        .then((response) => {
          setCardData(response.data);
        });
    } else {
      axios.get("http://localhost:3002/getAnimeData").then((response) => {
        setCardData(response.data);
      });
    }
  };

  const [searchKey, setsearchKey] = useState();
  const search = (e) => {
    nav(`/AnimeList/${searchKey}`);
  };
  useEffect(() => {
    GetCardData();
  }, []);

  return (
    <>
      <div className="admin-container admin-bg admin" style={style}>
        <div className="admin-nav">
          <h1 className="logo">ANIME</h1>
          <ul>
            <li>
              <a
                style={{ opacity: "40%" }}
                href="http://localhost:3000/dashboard"
              >
                Dashboard/
              </a>
            </li>
            <li>
              <a href="">View Animes</a>
            </li>
          </ul>

          <form onSubmit={search} action="">
            <h1>View Anime</h1>
            <div className="search-btn">
              <input
                onChange={(e) => {
                  setsearchKey(e.target.value);
                }}
                type="search"
                placeholder="search animes"
              />
              <button type="submit">
                <img src={IconsLinks.black_search} alt="" />
              </button>
            </div>
          </form>
        </div>
        <div className="ViewAnime">
          <div className="Card-container">
            {cardData.length > 0
              ? cardData.map((val, index) => {
                  // console.log(val.Poster_Image);
                  return (
                    <div key={index}>
                      <Card
                        AID={val.AID}
                        ImgLink={val.Poster_Image}
                        Title={val.Title}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeList;
