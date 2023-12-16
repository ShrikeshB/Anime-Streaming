import React from "react";
import { useNavigate, useParams } from "react-router";
import Card from "../Components/Cards/Card";
import Navigation from "../Components/nav/Navigation";
import axios from "axios";
import style from "./Style/Genre/Genre.css";
import { useEffect, useState } from "react";
const Genre = () => {
  let navigate = useNavigate();
  const { GenreName } = useParams();
  console.log(GenreName);
  const [CardData, setCardData] = useState([]);
  // const GetCardData = async () => {
  //   const res = await axios.get("http://localhost:3002/getCardData/Shounen", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setCardData(res.data.data);
  //   console.log(res.data.data);
  // };

  const GetCardData = async () => {
    const res = await axios
      .get("http://localhost:3002/getCardData/" + GenreName)
      .then((res) => {
        setCardData(res.data);
        console.log(res.data);
      });
  };

  const OpenCard = (id, title) => {
    navigate(`/animeDesc/${id}/${title}`);
  };

  useEffect(() => {
    GetCardData();
  }, []);

  return (
    <section className="GenrePage" style={style}>
      <Navigation />
      <div className="title">
        <h1> {GenreName}</h1>
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
};

export default Genre;
