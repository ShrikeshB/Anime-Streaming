import React  from 'react';
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
    axios
      .get(`http://localhost:3002/deleteWatchList/${UID}/${props.AID}`)
      .then((res) => {
        navigate(0);
      });
  };

  const OpenCard = async (id, title) => {
    navigate(`/animeDesc/${id}/${title}`);
    console.log(id);
  };

  return (
    <>
      <div className="card" style={CardsStyle}>
        <div
          onClick={() => {
            OpenCard(props.AID, props.Title);
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
            <p>Imdb 9/10</p>
          </span>
        </div>

        <div
          onClick={() => {
            OpenCard(props.AID, props.Title);
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
