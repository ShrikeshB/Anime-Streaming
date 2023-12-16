import React from "react";
import { useEffect, useState } from "react";
import SideNav from "../SideNav";
import axios from "axios";

//! style...
import style from "../Style/AddAnime/AddAnime.css";
import style1 from "../Style/AddEpisode/AddEpisode.css";
import IconsLinks from "../../../IconLinks";

// component
import Card from "./Card";
import { useNavigate, useParams } from "react-router";

function AddEpisode() {
  const [CardData, setCardData] = useState([]);
  const { key } = useParams();
  const cardData = () => {
    console.log(key);
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
  const nav = useNavigate();
  const win = window.sessionStorage;
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };

  const [searchKey, setsearchKey] = useState();
  const search = (e) => {
    nav(`/addEpisode/${searchKey}`);
  };
  useEffect(() => {
    checkForLogin();
    cardData();
  }, []);

  return (
    <>
      <div className="ViewAnime admin admin-bg">
        <div className="admin-nav">
          <h1 className="logo">ANIME</h1>
          <ul>
            <li>
              <a
                href="http://localhost:3000/dashboard"
                style={{ opacity: "40%" }}
              >
                Dashboard/
              </a>
            </li>
            <li>
              <a href="">Add Anime</a>
            </li>
          </ul>

          <form onSubmit={search} action="">
            <h1>Add Episodes</h1>
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

        <div className="Card-container">
          {CardData.length > 0
            ? CardData.map((val, index) => {
                // console.log(val.AID);
                return (
                  <div Key={index}>
                    <Card
                      Key={index}
                      AID={val.AID}
                      AnimeName={val.Title}
                      ImgLink={val.Poster_Image}
                      Title={val.Title}
                    />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default AddEpisode;
