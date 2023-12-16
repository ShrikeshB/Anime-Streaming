//! libraries
import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";

//! Media Links Here..
import IconLinks from "../IconLinks";
import ImgLinks from "../ImgLinks";

//! Component Links Here..
import Navigation from "../Components/nav/Navigation";
import AnimeDescStyle from "./Style/AnimeDesc/AnimeDesc.css";

import MyImg from "../Resources/Images/Posters/DS_poster.jpg";
import { useNavigate, useParams } from "react-router";
import TrailerVideoPlayer from "../Components/TrailerVideoPlayer/TrailerVideoPlayer";
import IconsLinks from "../IconLinks";

function AnimeDesc() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // params are used to fetch the AID from URL..
  const { AID, Title } = useParams();
  const win = window.sessionStorage;

  //! used to fetch the anime data..
  const getData = () => {
    axios.get(`http://localhost:3002/AnimeDesc/${AID}`).then((res) => {
      // console.log(res);
      setData(res.data[0]);
      // console.log(res.data[0]);
    });
  };

  //! used to verify whether the anime is already in the WatchList..
  const [WatchList, setWatchList] = useState(false);
  const WatchListVerifier = () => {
    if (win.getItem("UID") != null) {
      const UID = win.getItem("UID");
      axios
        .get(`http://localhost:3002/getWatchList/${UID}/${AID}`)
        .then((res) => {
          res.data.forEach((element) => {
            console.log("UID=" + UID);
            if (element.AID == AID) {
              setWatchList(true);
              console.log("already in WatchList");
            } else setWatchList(false);
          });
        });
      // console.log(UID);
    } else {
      setWatchList(false);
    }
  };

  //! used to open the episode page..
  const openPage = () => {
    if (win.getItem("UID") == null) {
      navigate("/Auth");
    } else if (win.getItem("Expired") == 1) {
      navigate("/Plans");
      console.log("expired");
    } else {
      const UID = win.getItem("UID");

      axios.get(`http://localhost:3002/getBilling/${UID}`).then((response) => {
        console.log(response.data[0]);
        if (response.data[0] == null) {
          console.log("no plans");
          navigate("/plans");
        } else {
          navigate(`/Episode/${AID}/${Title}`);
        }
      });
    }
  };

  //! used to add anime to WatchList...
  const AddToWatchList = () => {
    if (win.getItem("UID") == null) {
      navigate("/Auth");
    } else if (!WatchList) {
      const UID = win.getItem("UID");
      axios
        .post(`http://localhost:3002/AddToWatchList/${AID}/${UID}`)
        .then((res) => {
          console.log(res);
          setWatchList(true);
        });
    }
  };

  //! trailer video
  const [traileFlag, settraileFlag] = useState(false);
  const closeTrailer = () => {
    settraileFlag(false);
  };

  const playTrailer = () => {
    console.log("playing trailer...");
    settraileFlag(true);
  };

  useEffect(() => {
    WatchListVerifier();
  }, []);

  return (
    <>
      <Navigation />
      <main style={AnimeDescStyle} onLoad={getData}>
        <div className="bg">
          <img
            src={`http://localhost:3002/uploads/Cover/${data.Cover_Image}`}
            alt=""
          />

          {/* <!-- <video src="../Video/naruto1.mp4" muted autoplay loop></video> --> */}
        </div>

        <div
          className={traileFlag == true ? "videoPlayer active" : "videoPlayer"}
        >
          <div onClick={closeTrailer} className="close-btn">
            <img src={IconsLinks.close} alt="" />
          </div>
          {traileFlag ? <TrailerVideoPlayer path={data.Trailer_Link} /> : ""}
        </div>
        <div className="container">
          <div className="poster">
            <img
              src={`http://localhost:3002/uploads/Posters/${data.Poster_Image}`}
              alt=""
            />
          </div>

          <div className="content">
            <div className="c1">
              <p>2016</p>
              <h1>{data.Title}</h1>
              <ul>
                <li>
                  <p>{data.Genre}</p>
                </li>
                <li>
                  <p>Action</p>
                </li>
                <li>
                  <p>Drama</p>
                </li>
              </ul>
              <p className="desc">{data.Description}</p>
            </div>

            <div className="c2">
              <ul>
                <li>
                  <img src={IconLinks.clock_icon} alt="" />
                  <p>{data.Episode_Length} min</p>
                </li>

                <li>
                  <img src={IconLinks.sound_icon} alt="" />
                  <p>{data.Lang} </p>
                </li>

                <li>
                  <p>
                    Season: <span>0{data.Seasons}</span>{" "}
                  </p>
                </li>
                <li>
                  <p>
                    Imdb: <span>{data.IMDB_Rating} / 10</span>{" "}
                  </p>
                </li>
              </ul>
            </div>

            <div className="c3">
              <div
                onClick={openPage}
                style={{ cursor: "pointer" }}
                className="btn1"
              >
                <img src={IconLinks.minPlayBtn} alt="" />
                <p>Watch now</p>
              </div>

              <div onClick={playTrailer} className="btn2">
                <img src={IconLinks.playBtn2} alt="" />
                <p>Watch Trailer</p>
              </div>

              <button className="WatchList-btn" onClick={AddToWatchList}>
                <img src={WatchList ? IconLinks.check : IconLinks.add} alt="" />
                <p>Add To Watch list</p>
              </button>
            </div>
          </div>
        </div>

        <div className="similar-btn">
          <img src="../Icons/arrow-down.png" alt="" />
          <img src="../Icons/arrow-down.png" alt="" />
        </div>

        <div className="similar">
          <h1 className="title">Similar Anime</h1>
          <div className="card-container">
            <a href="" className="card">
              <div className="img-container">
                <img src="../Images/Posters/61k3qe5zitL.jpg" alt="" />
              </div>

              <div className="content">
                <p>Shounen</p>
                <h1>Death Note</h1>
                <span>
                  <div className="circle"></div>
                  <p>Imdb 9/10</p>
                </span>
              </div>

              <div className="play-btn">
                <img src="../Icons/Play-Btn-Mid.png" alt="play btn" />
              </div>
            </a>

            <a href="" className="card">
              <div className="img-container">
                <img
                  src="../Images/Posters/71uT+Js3kCS._AC_SL1024_.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <p>Shounen</p>
                <h1>Death Note</h1>
                <span>
                  <div className="circle"></div>
                  <p>Imdb 9/10</p>
                </span>
              </div>

              <div className="play-btn">
                <img src="../Icons/Play-Btn-Mid.png" alt="play btn" />
              </div>
            </a>

            <a href="" className="card">
              <div className="img-container">
                <img
                  src="../Images/Posters/71uT+Js3kCS._AC_SL1024_.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <p>Shounen</p>
                <h1>Death Note</h1>
                <span>
                  <div className="circle"></div>
                  <p>Imdb 9/10</p>
                </span>
              </div>

              <div className="play-btn">
                <img src="../Icons/Play-Btn-Mid.png" alt="play btn" />
              </div>
            </a>

            <a href="" className="card">
              <div className="img-container">
                <img
                  src="../Images/Posters/71uT+Js3kCS._AC_SL1024_.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <p>Shounen</p>
                <h1>Death Note</h1>
                <span>
                  <div className="circle"></div>
                  <p>Imdb 9/10</p>
                </span>
              </div>

              <div className="play-btn">
                <img src="../Icons/Play-Btn-Mid.png" alt="play btn" />
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default AnimeDesc;
