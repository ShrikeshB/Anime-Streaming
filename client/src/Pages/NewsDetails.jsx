import { useParams } from "react-router";
import Footer from "../Components/Footer/Footer";
import NewsCard2 from "../Components/NewsCard2/NewsCard2";
import Navigation from "../Components/nav/Navigation";
import Images from "../ImgLinks";
import style from "./Style/NewsDetails/NewsDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
function NewsDetails() {
  const { NID } = useParams();

  const [news, setNews] = useState({});

  const [recomData, setrecomData] = useState([]);
  const getNews = () => {
    axios.get(`http://localhost:3002/getNewsByNID/${NID}`).then((res) => {
      console.log(res);
      setNews(res.data[0]);
    });

    axios.get("http://localhost:3002/getNewsRecommendation").then((res) => {
      console.log(res);
      setrecomData(res.data);
    });
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <section className="NewsDetails" style={style}>
      <Navigation />
      <div className="banner">
        <h1 className="logo">ANIME News</h1>
      </div>

      <div className="container">
        <div className="left">
          <h1>{news.Title}</h1>
          <div className="img-container">
            <img
              src={"http://localhost:3002/uploads/News/" + news.Image}
              alt=""
            />
          </div>
          <p>{news.Description}</p>
        </div>
        <div className="right">
          <div className="topics">
            <h2>Topics</h2>
            <ul>
              <li>
                <a href="">Shounen</a>
              </li>
              <li>
                <a href="">Seinen</a>
              </li>
              <li>
                <a href="">Slice of life</a>
              </li>
              <li>
                <a href="">Shoujo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="recommended">
        <h1>Recommended</h1>
        <div className="container">
          {recomData.map((val, index) => {
            return (
              <NewsCard2
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

      <Footer />
    </section>
  );
}

export default NewsDetails;
