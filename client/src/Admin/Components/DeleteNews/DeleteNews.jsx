//! Library
import React from "react";
import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";

//! style
import style from "./style/DeleteNews.css";

import IconsLinks from "../../../IconLinks";
import NewsCard from "../NewsCard/NewsCard";
import { useNavigate, useParams } from "react-router";

const DeleteNews = () => {
  const [newsData, setnewsData] = useState([]);
  const { key } = useParams();
  const getNewsData = () => {
    if(key != null){
      axios.get(`http://localhost:3002/getNewsByTitle/${key}`).then((res) => {
        console.log(res);
        setnewsData(res.data);
      });
    }else{
      axios.get("http://localhost:3002/getNews").then((res) => {
      console.log(res);
      setnewsData(res.data);
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
    nav(`/DeleteNews/${searchKey}`);
  };
  useEffect(() => {
    checkForLogin();
    getNewsData();
  }, []);

  return (
    <>
      <div style={style} className="DeleteNews admin-container admin-bg admin">
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
              <a href="">View News</a>
            </li>
          </ul>

          <form onSubmit={search} action="">
            <h1>Add News</h1>
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

        <div className="news-container">
          {newsData.map((val, index) => {
            return (
              <NewsCard
                key={index}
                imgPath={val.Image}
                Title={val.Title}
                desc={val.Description}
                Timestamp={val.Timestamp}
                NID={val.NID}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default DeleteNews;
