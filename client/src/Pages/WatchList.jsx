import React  from 'react';
import { useEffect, useState } from "react";
import Card from "../Components/WatchListCard/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import style from "./Style/Genre/Genre.css";
import Navigation from "../Components/nav/Navigation";

function WatchList() {
  const [CardData, setCardData] = useState([]);
  const win = window.sessionStorage;
  const nav = useNavigate();
  const getCardData = () => {
    const UID = win.getItem("UID");
    if(UID == null){
      nav("/Auth");
    }
    axios.get(`http://localhost:3002/getWatchListAnime/${UID}`).then((res) => {
      setCardData(res.data);
      console.log(res.data);
    });
  };

  const navigate = useNavigate();
  const OpenCard = async (id,title) => {
    navigate(`/animeDesc/${id}/${title}`);
    // console.log(id);
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <section className="GenrePage" style={style}>
      <Navigation />
      <div className="title">
        <h1>WatchList</h1>
      </div>
      <div className="card-container">
        {CardData.map((val, index) => {
          return (
            <div
           
              key={index}
            >
              <Card AID={val.AID} ImgLink={val.Poster_Image} Title={val.Title} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WatchList;
