import React from "react";

import CardsStyle from "../../Components/Cards/style/cards.css";
import IconsLinks from "../../IconLinks";

//!  Components here...

function Card(props) {
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
            <p>Imdb {props.IMDB}/10</p>
          </span>
        </div>

        <div className="play-btn">
          <img src={IconsLinks.playBtn} alt="play btn" />
        </div>
      </div>
    </>
  );
}

export default Card;
