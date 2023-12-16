import React from "react";

import { useNavigate } from "react-router";
import CardsStyle from "../../Components/WatchListCard/style/cards.css";
import IconsLinks from "../../IconLinks";
import axios from "axios";

function Card(props) {
  const win = window.sessionStorage;
  const navigate = useNavigate();
  const UID = win.getItem("UID");
  if (UID == null) navigate("/Auth");
  const RemoveAnime = () => {
    console.log(props.AID);
    console.log(UID);
    axios
      .get(`http://localhost:3002/deleteCW/${UID}/${props.AID}`)
      .then((res) => {
        navigate(0);
      });
  };

  const openCW = (ENo, AID, SNo) => {
    navigate(`/PlayEpisode/${ENo}/${AID}/${SNo}/${props.EID}`);
  };

  return (
    <>
      <div className="card" style={CardsStyle}>
        <div
          onClick={() => {
            openCW(props.ENo, props.AID, props.SNo);
          }}
          className="img-container"
        >
          <img
            src={`http://localhost:3002/uploads/Posters/${props.ImgLink}`}
            alt=""
          />
        </div>

        <div className="content">
          <p>Shounen</p>
          <h1>{props.Title}</h1>
          <span>
            <div className="circle"></div>
            <p>Imdb {props.IMDB}/10</p>
          </span>
        </div>

        <div
          onClick={() => {
            openCW(props.ENo, props.AID, props.SNo);
          }}
          className="play-btn"
        >
          <img src={IconsLinks.playBtn} alt="play btn" />
        </div>
        <button onClick={RemoveAnime} className="remove-btn">
          <p>Remove</p>
        </button>
      </div>
    </>
  );
}

export default Card;
