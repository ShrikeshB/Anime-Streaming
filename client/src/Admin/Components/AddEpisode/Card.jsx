//** This Card is used for Adding the episodes in the Anime **/
import React from "react";

import { useNavigate } from "react-router";
import CardsStyle from "../Style/Card/Card.css";

function Card(props) {
  console.log(props.AID);
  const AnimeName = props.AnimeName;

  const navigate = useNavigate();
  const AddEpisode = () => {
    const id = props.AID;
    navigate(`/Episodes/${id}/${AnimeName}`);
  };

  return (
    <>
      <div className="card" style={CardsStyle}>
        <div className="img-container">
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

        <div className="Btns">
          <button className="Edit-Btn" onClick={AddEpisode}>
            Add Episode
          </button>
          <a
            href={`EditEpisode/${props.AID}`}
            style={{ fontSize: "12px" }}
            className="Delete-Btn"
          >
            Edit Episode
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
