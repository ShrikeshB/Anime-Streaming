import React, { useEffect, useState } from "react";
import style from "./Style/News/News.css";
import Navigation from "../Components/nav/Navigation";
import NewsCard from "../Components/NewsCard/NewsCard";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function News() {
  const [news, setNews] = useState([]);

  const { genre } = useParams();

  const getNews = () => {
    if (genre != null) {
      console.log(genre);
      axios.get(`http://localhost:3002/getNewsByGenre/${genre}`).then((res) => {
        console.log(res);
        setNews(res.data);
      });
    } else {
      axios.get("http://localhost:3002/getNews").then((res) => {
        console.log(res);
        setNews(res.data);
      });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className="News" style={style}>
      <Navigation />
      <div className="banner">
        <h1 className="logo">ANIME News</h1>
      </div>
      <div className="container">
        <div className="left">
          <div className="posts">
            {news.map((val, index) => {
              return (
                <NewsCard
                  CoverImage={val.Image}
                  NID={val.NID}
                  Title={val.Title}
                  Desc={val.Description}
                  Date={val.Timestamp}
                />
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="topics">
            <h2>Topics</h2>
            <ul>
              <li>
                <a href="/news">All</a>
              </li>
              <li>
                <a href="/news/Shounen">Shounen</a>
              </li>
              <li>
                <a href="/news/Seinen">Seinen</a>
              </li>
              <li>
                <a href="/news/Slice of life">Slice of life</a>
              </li>
              <li>
                <a href="/news/Shoujo">Shoujo</a>
              </li>
              <li>
                <a href="/news/Isekai">Isekai</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default News;
