import React from "react";
import style from "./style/Footer.css";
import BG from "../../Resources/Assets/bg.png";
import IconsLinks from "../../IconLinks";
const Footer = () => {
  return (
    <>
      <footer style={style}>
        <div className="left">
          <div className="logo">
            <a href="/">
              <h1>ANIME</h1>
            </a>
          </div>
          <p>Follow us</p>
          <ul>
            <li>
              <a href="">
                <img src={IconsLinks.insta} alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={IconsLinks.twitter} alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={IconsLinks.FB} alt="" />
              </a>
            </li>
          </ul>

          <br />
          <p>Links</p>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/About">About</a>
            </li>
            <li>
              <a href="/Contact">Contact</a>
            </li>
            <li>
              <a href="/Plans">Plans</a>
            </li>

            <li>
              <a href="/News">News</a>
            </li>
          </ul>
        </div>
        <div className="right">
          <div className="img-container">
            <img src={BG} alt="" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
