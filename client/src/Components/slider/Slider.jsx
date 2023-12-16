import React  from 'react';

import { useNavigate } from "react-router";
import Images from "./Data";

import SliderStyle from "./slideStyle.css";

const Slider = (props) => {
  // helps to change the slides
  const slideChange = (event) => {
    let slideName = event.target.classList[1];
    console.log(props.data[0]);

    let SC = document.querySelector(".slider-container");
    let s1 = document.querySelector(".s1");
    let s2 = document.querySelector(".s2");
    let s3 = document.querySelector(".s3");
    let s4 = document.querySelector(".s4");
    let s5 = document.querySelector(".s5");

    console.log(props.data);

    // helps to change translation values as per element targeted..
    switch (event.target) {
      case s1:
        SC.style.transform = "translateX(0%)";
        break;
      case s2:
        SC.style.transform = "translateX(-20%)";
        break;
      case s3:
        SC.style.transform = "translateX(-40%)";
        break;
      case s4:
        SC.style.transform = "translateX(-60%)";
        break;
      case s5:
        SC.style.transform = "translateX(-80%)";
        break;
    }

    // helps to add/remove the .active class from element and change color of nav btn..
    const S = [s1, s2, s3, s4, s5];
    S.forEach((item) => {
      if (item === event.target) {
        event.target.classList.add("active");
      } else if (item != event.target) {
        item.classList.remove("active");
      }
    });
  };

  const navigate = useNavigate();
  const WatchAnime = (id) => {
    navigate(`/animeDesc/${id}`);
  };

  return (
    <div className="slider" style={SliderStyle}>
      <div className="slider-container">
        {props.data.map((val, index) => {
          if (index <= 5)
            return (
              <div className="slide" key={index}>
                <div className="container">
                  <div className="img-container">
                    <div className="overlay"></div>
                    <img
                      src={`http://localhost:3002/uploads/Cover/${val.Cover_Image}`}
                      alt=""
                    />
                  </div>
                  <a
                    href={`/animeDesc/${val.AID}/${val.Title}`}
                    class="play-btn"

                  >
                    <img src={Images.PlayBtn} alt="" />
                    <p>WATCH NOW</p>
                  </a>

                  <div className="content">
                    <div className="title">
                      <h1>{val.Title}</h1>
                      <ul>
                        <li>
                          <p>{val.Genre}</p>
                        </li>
                        <li>
                          <p>Imdb {val.IMDB_Rating}/10</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
        })}

        {/* <div className="slide">
          <div className="container">
            <div className="img-container">
              <div className="overlay"></div>
              <img src={Images.slide1} alt="" />
            </div>
            <a href="" class="play-btn">
              <img src={Images.PlayBtn} alt="" />
              <p>WATCH NOW</p>
            </a>

            <div className="content">
              <div className="title">
                <h1>{}</h1>
                <ul>
                  <li>
                    <p>Shounen</p>
                  </li>
                  <li>
                    <p>Imdb 9/10</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="container">
            <div className="img-container">
              <div className="overlay"></div>
              <img src={Images.slide2} alt="" />
            </div>
            <a href="" class="play-btn">
              <img src={Images.PlayBtn} alt="" />
              <p>WATCH NOW</p>
            </a>
            <div className="content">
              <div className="title">
                <h1>naruto shippuden</h1>
                <ul>
                  <li>
                    <p>Shounen</p>
                  </li>
                  <li>
                    <p>Imdb 9/10</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="container">
            <div className="img-container">
              <div className="overlay"></div>
              <img src={Images.DS} alt="" />
            </div>
            <a href="" class="play-btn">
              <img src={Images.PlayBtn} alt="" />
              <p>WATCH NOW</p>{" "}
            </a>
            <div className="content">
              <div className="title">
                <h1>naruto shippuden</h1>
                <ul>
                  <li>
                    <p>Shounen</p>
                  </li>
                  <li>
                    <p>Imdb 9/10</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="container">
            <div className="img-container">
              <div className="overlay"></div>
              <img src={Images.slide3} alt="" />
            </div>
            <a href="" class="play-btn">
              <img src={Images.PlayBtn} alt="" />
              <p>WATCH NOW</p>{" "}
            </a>
            <div className="content">
              <div className="title">
                <h1>naruto shippuden</h1>
                <ul>
                  <li>
                    <p>Shounen</p>
                  </li>
                  <li>
                    <p>Imdb 9/10</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="container">
            <div className="img-container">
              <div className="overlay"></div>
              <img src={Images.slide3} alt="" />
            </div>
            <a href="" class="play-btn">
              <img src={Images.PlayBtn} alt="" />
              <p>WATCH NOW</p>{" "}
            </a>
            <div className="content">
              <div className="title">
                <h1>naruto shippuden</h1>
                <ul>
                  <li>
                    <p>Shounen</p>
                  </li>
                  <li>
                    <p>Imdb 9/10</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="navigation">
        <div className="container">
          <div className="slide-btn s1 active" onClick={slideChange}></div>
          <div className="slide-btn s2" onClick={slideChange}></div>
          <div className="slide-btn s3" onClick={slideChange}></div>
          <div className="slide-btn s4" onClick={slideChange}></div>
          <div className="slide-btn s5" onClick={slideChange}></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
