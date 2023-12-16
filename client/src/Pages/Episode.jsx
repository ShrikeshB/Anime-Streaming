import React  from 'react';

import EpisodeStyle from "./Style/Episode/Episode.css";
import ImgLinks from "../ImgLinks";
import IconLinks from "../IconLinks";
import axios from "axios";

//! Components Links Here...
import Navigation from "../Components/nav/Navigation";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

function Episode() {
  const [Data, setData] = useState({});
  const [Data2, setData2] = useState([]);
  const [TotalSeason, setTotalSeason] = useState(1);
  const [billingData, setBillingData] = useState();

  const { AID, Title } = useParams();
  const win = window.sessionStorage;
  const UID = win.getItem("UID");
  console.log(UID);
  const navigate = useNavigate();
  const getEpisodeData = (SNo) => {
    if (win.getItem("UID") == null) {
      navigate("/Auth");
    }
    if (win.getItem("Expired") == 1) {
      navigate("/Plans");
      // console.log("expired");
    }
    axios
      .get(`http://localhost:3002/getAnime/${AID}/${SNo}`)
      .then((response) => {
        setData(response.data[0]);
        setData2(response.data);
        Insert_Ep_Progress(response.data[0].EID);
      });

    axios
      .get(`http://localhost:3002/getSeasonCount/${AID}`)
      .then((response) => {
        setTotalSeason(response.data[0].TotalSeason);
        // console.log(response.data[0]);
      });
  };

  const PlayEpisode = (ENo, SNo,EID) => {
    navigate(`/PlayEpisode/${ENo}/${AID}/${SNo}/${EID}`);
  };

  const lastEp = Data2.length - 1;
  const [count, setCount] = useState(1);
  //! Episode Increment...
  let increaseEpNo = (e) => {
    console.log("last=" + lastEp);
    e.preventDefault();
    if (count < lastEp) {
      setCount((prevCount) => prevCount + 1);
      console.log("in if = " + count);
      setData(Data2[count]);
    } else {
      setCount(lastEp);
      console.log("in else   = " + count);
      setData(Data2[Data2.length - 1]);
    }
    console.log("last Ep=" + lastEp);
  };

  //! Episode Decrement...
  let decreaseEpNo = (e) => {
    e.preventDefault();
    if (count <= lastEp && count > 1) {
      setCount((prevCount) => prevCount - 1);
      setData(Data2[count - 1]);
      console.log("if de=" + count);
    } else {
      setCount(1);
      setData(Data2[0]);

      console.log("else de=" + count);
    }
  };

  //! Season Incrment..
  let [counter, setCounter] = useState(1);
  let incrementSeason = (e) => {
    e.preventDefault();
    console.log(TotalSeason);
    if (counter < TotalSeason) {
      setCounter((prevCount) => prevCount + 1);
      getEpisodeData(counter + 1);
      console.log("in if " + counter);
    } else {
      setCounter(TotalSeason);
      getEpisodeData(TotalSeason);
      console.log("in esle " + counter);
    }

    console.log(counter);
  };

  //! Season Decrement..
  let decrementSeason = (e) => {
    e.preventDefault();

    if (counter <= TotalSeason && counter > 1) {
      setCounter((prevCount) => prevCount - 1);
      getEpisodeData(counter - 1);
      console.log("if " + counter);
    } else {
      setCounter(1);
      getEpisodeData(1);
      console.log("else " + counter);
    }

    console.log(counter);
  };

  //! used to insert/update Ep progress in database..
  const Insert_Ep_Progress = (EID) => {
    console.log("ep pro=", win.getItem("EpProgress"));
    if (win.getItem("EpProgress") > 0 && win.getItem("EpProgress") != null) {
      const data = {
        UID: win.getItem("UID"),
        AID: AID,
        EID: EID,
        Progress: win.getItem("EpProgress"),
      };

      console.log("progress in play=", win.getItem("EpProgress"));
      axios
        .post("http://localhost:3002/ep_Progress", data)
        .then((result) => {});
    }
  };

  useEffect(() => {
    getEpisodeData("1");
  }, []);

  return (
    <>
      <section className="main-section" style={EpisodeStyle}>
        <Navigation />
        <div className="bg-img">
          <img
            src={`http://localhost:3002/uploads/Episode/CoverImg/${Title}/${Data.CoverImage}`}
            alt=""
          />
        </div>

        <div className="main-container">
          <div className="content">
            <div
              className="play-btn"
              onClick={() => {
                PlayEpisode(Data.EpisodeNumber, Data.SeasonNumber,Data.EID);
              }}
            >
              <img src={IconLinks.playBtn} alt="" />
            </div>
            <div className="left">
              <h1 className="title">{Data.Title}</h1>

              <p className="ep-name">{Data.EpisodeName}</p>
              <div className="episode">
                <h2>{Data.EpisodeNumber} EP</h2>
                <div className="btn-grp">
                  <img src={IconLinks.left_arr} alt="" onClick={decreaseEpNo} />
                  <img
                    src={IconLinks.right_arr}
                    alt=""
                    onClick={increaseEpNo}
                  />
                </div>
              </div>
            </div>

            <div className="right">
              <div className="season">
                <img
                  src={IconLinks.left_arr}
                  alt=""
                  onClick={decrementSeason}
                />
                <span>
                  {" "}
                  <pre>S</pre> 0{Data.SeasonNumber}
                </span>
                <img
                  src={IconLinks.right_arr}
                  alt=""
                  onClick={incrementSeason}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Episode;
