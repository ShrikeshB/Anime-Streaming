import React from "react";

import img1 from "../../Resources/Assets/Ruffy.png";
import img2 from "../../Resources/Assets/Tanjiro Kamado.png";
import img3 from "../../Resources/Assets/naruto frog sage.png";
import img4 from "../../Resources/Assets/One piece wallpaper by stormzeditz - Download on ZEDGE™ _ aa48.png";
import img5 from "../../Resources/Assets/download (1).png";
import img6 from "../../Resources/Assets/Ruffy.png";
import style from "./style/genre.css";

const Genre = () => {
  return (
    <>
      <div style={style} className="GenreContainer">
        <ul>
          <li className="G1">
            <a href="http://localhost:3000/Genre/Shounen">
              <h1 className="title">Shounen</h1>
              <div className="overlay">
                <h1 className="head1">Shounen</h1>
              </div>
              <div className="img-container">
                <img src={img1} alt="" />
              </div>
            </a>
          </li>
          <li className="G2">
            <a href="http://localhost:3000/Genre/Seinen">
              <h1 className="title">Seinen</h1>

              <div className="overlay">
                <h1 className="head2">Seinen</h1>
              </div>
              <div className="img-container">
                <img src={img2} alt="" />
              </div>
            </a>
          </li>
          <li className="G3">
            <a href="http://localhost:3000/Genre/Isekai">
              <h1 className="title">Isekai</h1>

              <div className="overlay">
                <h1 className="head3">Isekai</h1>
              </div>
              <div className="img-container">
                <img src={img3} alt="" />
              </div>
            </a>
          </li>
          <li className="G4">
            <a href="http://localhost:3000/Genre/Shoujo">
              <h1 className="title">Shoujo</h1>

              <div className="overlay">
                <h1 className="head4">Shoujo</h1>
              </div>
              <div className="img-container">
                <img src={img4} alt="" />
              </div>
            </a>
          </li>
          <li className="G5">
            <a href="http://localhost:3000/Genre/Slice of life">
              <h1
                style={{ fontSize: "18px", marginTop: "3em" }}
                className="title"
              >
                Slice of life
              </h1>

              <div className="overlay">
                <span className="head5">life</span>
                <span className="head5">of</span>
                <span style={{marginTop:'1em'}} className="head5">Slice</span>
              </div>
              <div className="img-container">
                <img src={img5} alt="" />
              </div>
            </a>
          </li>
        </ul>
      </div>
      <br />
    </>
  );
};

export default Genre;
