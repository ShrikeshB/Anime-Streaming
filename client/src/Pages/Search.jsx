import React from "react";
import { useEffect, useState } from "react";
import Card from "../Components/Cards/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import style from "./Style/Genre/Genre.css";
import Navigation from "../Components/nav/Navigation";

function Search() {
  const { key } = useParams();
  const [CardData, setCardData] = useState([]);
  const getCardData = () => {
    console.log(key);
    axios.get(`http://localhost:3002/SearchAnime/${key}`).then((res) => {
      setCardData(res.data);
      console.log(CardData);
    });
  };

  const navigate = useNavigate();
  const OpenCard = (id, title) => {
    navigate(`/animeDesc/${id}/${title}`);
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <section className="GenrePage" style={style}>
      <Navigation />
      <div className="title">
        <h1> {CardData.length > 0 ? key : "No Result"} </h1>
      </div>
      <div className="card-container">
        {CardData.map((val, index) => {
          return (
            <div
              onClick={() => {
                OpenCard(val.AID, val.Title);
              }}
              key={index}
            >
              <Card
                ImgLink={val.Poster_Image}
                Title={val.Title}
                IMDB={val.IMDB_Rating}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Search;
