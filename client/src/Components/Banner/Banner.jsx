import React  from 'react';

import VideoLinks from "../../VideoLinks";
import BannerStyle from "./style/banner.css";
import IconsLinks from "../../IconLinks";
import { useNavigate } from "react-router";

const Banner = (props) => {
  const navigate = useNavigate();
  const openLink = (AID) => {
    navigate(`/animeDesc/${AID}/${props.title}`);
  };

  return (
    <>
      <section class="banner" style={BannerStyle}>
        <div class="img-container">
          {/* <!-- <img src="../Images/DS.png" alt="" /> --> */}
          <video
            src={`http://localhost:3002/uploads/Clips/${props.videoLink}`}
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div class="play-btn">
          <img
            src={IconsLinks.playBtn}
            alt=""
            onClick={() => {
              openLink(props.AID);
            }}
          />
        </div>

        <div class="content">
          <h1 class="title">{props.title}</h1>
          <ul>
            <li>
              <p>Imdb {props.imdb}/10</p>
            </li>
            <li>
              <p>{props.genre}</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Banner;
