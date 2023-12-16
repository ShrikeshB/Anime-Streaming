import React  from 'react';

import HomeStyle from "./Style/Home/home.css";

// import videoLink from "../../src/Resources/Video/naruto1.mp4";
import videoLink from "../../src/Resources/Video/Naruto _ Akatsuki - Official Manga Trailer_Trim.mp4";

const Home = () => {
  const Con_MouseMove = (e) => {
    const container = document.querySelector(".container");
    let xAxis = (window.innerWidth / 2 - e.pageX) / 100;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 100;
    container.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
  };

  const Con_MouseEnter = (e) => {
    const container = document.querySelector(".container");
    const title = document.querySelector(".content");
    container.style.transition = "all 0.1s ease";

    //popout
    title.style.transform = "translateZ(100px)";
  };

  const Con_MouseLeaves = (e) => {
    const container = document.querySelector(".container");
    const title = document.querySelector(".content");
    container.style.transition = "all 0.5s ease";
    container.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //popback
    title.style.transform = "translateZ(0px)";
  };

  const Head_MouseOver = (e) => {
    let btn = document.querySelector(".btn-grp");
    let overlay = document.querySelector(".img-holder2");
    btn.classList.add("active");
    overlay.classList.add("active");
  };

  const Head_MouseEnter = (e) => {
    let btn = document.querySelector(".btn-grp");
    btn.classList.add("active");
  };

  const Head_MouseLeaves = (e) => {
    let btn = document.querySelector(".btn-grp");
    let overlay = document.querySelector(".img-holder2");

    setTimeout(() => {
      btn.classList.remove("active");
      overlay.classList.remove("active");
    }, 3000);
  };

  return (
    <>
      <div className="hero-section" style={HomeStyle}>
        <section
          className="container"
          onMouseMove={Con_MouseMove}
          onMouseLeave={Con_MouseLeaves}
          onMouseEnter={Con_MouseEnter}
        >
          <div className="img-holder">
            <video src={videoLink} loop autoPlay muted></video>
          </div>
          <div className="img-holder2"></div>
          <div className="content">
            <div
              className="heading"
              onMouseOver={Head_MouseOver}
              onMouseEnter={Head_MouseEnter}
              onClick={Head_MouseEnter}
              onMouseLeave={Head_MouseLeaves}
            >
              <span>ANIME</span>
              <h1>STREAMING</h1>
              <p>Stream Any Anime</p>
            </div>
            <div className="btn-grp">
              <a href="/Auth" className="explore b1">
                SIGN UP
              </a>
              <a href="/Auth  " className="explore b2">
                LOGIN
              </a>
              <a href="/explore" className="explore b3">
                EXPLORE NOW
              </a>
              <a href="/about" className="explore b4">
                ABOUT US
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
