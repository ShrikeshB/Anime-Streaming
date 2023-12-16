import React from "react";
import style from "./Style/About/About.css";
const About = () => {
  return (
    <>
      <div style={style} className="about-us">
        <div className="banner"></div>
        <div className="container">
          <h1>
            Know <span>About</span>
          </h1>
          <div className="logo">
            <p>ANIME</p>
          </div>
          <p>
       Anime OTT PLatform is a dedicated streaming pllatform for Anime lovers. It offers a vast library anime content to watch. 
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
