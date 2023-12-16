import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import style from "./Style/PlayEpisode/PlayEpisode.css";

//! Components...
import EpisodeCard from "../Components/EpisodeCard/EpisodeCard";
import VideoPlayer from "../Components/VideoPlayer/VideoPlayer";
import Navigation from "../Components/nav/Navigation";
import IconsLinks from "../IconLinks";
import Footer from "../Components/Footer/Footer";
import Card from "../Components/Cards/Card";

function PlayEpisode() {
  const [data, setData] = useState({});
  const [AllEpisode, setAllEpisode] = useState([]);

  const { EID } = useParams();
  const { EpNo } = useParams();
  const { AID } = useParams();
  const { SNo } = useParams();
  const win = window.sessionStorage;
  const navigate = useNavigate();
  //style component...
  const Start = (props) => {
    return (
      <div style={props.style} className="start">
        <h1>{props.Title}</h1>
        <div className="line"></div>
      </div>
    );
  };

  //style component...
  const End = (props) => {
    return (
      <div className="End">
        <div className="line"></div>
        <a href={"http://localhost:3000/Genre/" + props.GenreName}>Sell All</a>
      </div>
    );
  };

  const openCard = async (id, title) => {
    navigate(`/animeDesc/${id}/${title}`);
    // console.log(id);
  };

  const PlayEpisode = () => {
    //* get single episode..
    console.log("----------- play episdoea ------------");


    if (win.getItem("UID") == null) {
      navigate("/Auth");
    }
    if (win.getItem("Expired") == 1) {
      navigate("/Plans");
    }
    if (win.getItem("EpProgress") == null) {
      win.setItem("EpProgress", 0);
    }

    if (win.getItem("UID") == null) {
      navigate("/Auth");
    }

    
    axios.get(`http://localhost:3002/getBilling/${win.getItem("UID")}`).then((response) => {
        console.log(response.data[0]);
        if (response.data[0] == null) {
          console.log("no plans");
          navigate("/plans");
        }
      });


    axios.get(`http://localhost:3002/PlayEpisode/${EID}`).then((response) => {
      setData(response.data[0]);
      console.log(response.data[0].VideoLink720);
      Load_Ep_Progress(response.data[0].EID);
    });

    //* get All episodes..
    axios
      .get(`http://localhost:3002/getEpisode/${AID}/${SNo}`)
      .then((response) => {
        setAllEpisode(response.data);
        // console.log(data);
      });
  };

  const [Ep_Progress, setEp_Progress] = useState(0);
  const Load_Ep_Progress = (EID) => {
    const UID = win.getItem("UID");
    win.setItem("CW_AID", AID);
    win.setItem("CW_EID", EID);
    axios
      .get(`http://localhost:3002/getEp_progress/${UID}/${AID}/${EID}`)
      .then((res) => {
        if (res.data != null && res.data != "") {
          console.log(res.data);
          setEp_Progress(res.data[0].Progress);
        }
      });
  };

  // getting season counnter and adding it to array
  const [TotalSeason, SetTotalSeason] = useState([]);
  let arr = [];
  let counter = 0;
  const getSeasonCount = () => {
    axios.get(`http://localhost:3002/getSeasonCount/${AID}`).then((res) => {
      // console.log(res.data[0].TotalSeason);
      for (let i = 1; i <= res.data[0].TotalSeason; i++) {
        console.log(i);
        arr[counter] = i;
        counter++;
      }
      SetTotalSeason(arr);
    });
  };

  // dont mess with below code..
  // used to operate episode in blocks..
  const [ep_list, setEp_list] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(SNo);
  const [nextEp, setNextEp] = useState(1);
  const [prevEp, setPrevEp] = useState(EpNo > 1 ? EpNo - 1 : EpNo);

  const getAllEpisode = (season) => {
    axios
      .get(`http://localhost:3002/getEpisode/${AID}/${season}`)
      .then((response) => {
        setEp_list(response.data);
        console.log("-----------");
        setSelectedSeason(season);
        console.log(response.data);
        setNextEp(EpNo < response.data.length ? parseInt(EpNo) + 1 : EpNo);
      });
  };

  const [ShounenCardData, setShounenCardData] = useState([]);
  const getCardInfo = async () => {
    axios
      .get(`http://localhost:3002/PlayEpisode/${EpNo}/${AID}/${SNo}`)
      .then((response) => {
        axios
          .get(`http://localhost:3002/getCardData/${response.data[0].Genre}`)
          .then((result) => {
            setShounenCardData(result.data);
          });
      });
  };

  //! used to insert/update Ep progress in database..
  const Insert_Ep_Progress = (EID, link) => {
    console.log("ep pro=", win.getItem("EpProgress"));

    if (win.getItem("EpProgress") > 0 && win.getItem("EpProgress") != null) {
      const data = {
        UID: win.getItem("UID"),
        AID: AID,
        EID: EID,
        Progress: win.getItem("EpProgress"),
      };
      window.location = link;

      console.log("progress in play=", win.getItem("EpProgress"));
      axios
        .post("http://localhost:3002/ep_Progress", data)
        .then((result) => {});
    }
  };

  const openEpisode = (link) => {
    axios.get(`http://localhost:3002/PlayEpisode/${EID}`).then((response) => {
      console.log(response.data[0]);
      Insert_Ep_Progress(response.data[0].EID, link);
    });
  };

  useEffect(() => {
    PlayEpisode();
    getSeasonCount();
    getAllEpisode(SNo);
    getCardInfo();
  }, []);

  return (
    <section>
      <Navigation />
      <section className="PlayEpisode-section" style={style}>
        <div className=" PlayEpisode-container">
          <div className="left">
            <VideoPlayer
              UID={win.getItem("UID")}
              AID={data.AID}
              EID={data.EID}
              Progress={Ep_Progress}
              SNo={SNo}
              Title={data.EpisodeName}
              path1080={`http://localhost:3002/uploads/Episode/EpisodeVideo/${data.Title}/1080/${data.VideoLink1080}`}
              path720={`http://localhost:3002/uploads/Episode/EpisodeVideo/${data.Title}/720/${data.VideoLink720}`}
              path480={`http://localhost:3002/uploads/Episode/EpisodeVideo/${data.Title}/480/${data.VideoLink480}`}
            />
            <div className="controls">
              <div className="auto-play">
                <label htmlFor="autoplay" className="autoplay-container">
                  <input type="checkbox" name="autoplay" id="autoplay" />
                  Auto Play
                </label>
              </div>
              <div className="switch-ep">
                <a
                  href={`/PlayEpisode/${prevEp}/${AID}/${SNo}`}
                  className="prev"
                >
                  <img src={IconsLinks.prev} alt="" />
                  Prev
                </a>
                <a
                  href={`/PlayEpisode/${nextEp}/${AID}/${SNo}`}
                  className="prev next"
                >
                  Next
                  <img src={IconsLinks.next} alt="" />
                </a>
              </div>
            </div>
            <div className="ep-content">
              <p className="Ep-data">
                S{data.SeasonNumber}-0{data.EpisodeNumber}EP
              </p>
              <p style={{ fontSize: "12px" }}>{data.EpisodeName}</p>
            </div>
          </div>

          <div className="right">
            <div className="episode-list">
              <p className="subHead">Episodes</p>
              <div className="ep-list-container">
                {AllEpisode.map((val, index) => {
                  return (
                    <a
                      style={{ textDecoration: "none" }}
                      // href={`/PlayEpisode/${val.EpisodeNumber}/${AID}/${SNo}`}
                      key={index}
                      onClick={(e) => {
                        openEpisode(
                          `/PlayEpisode/${val.EpisodeNumber}/${AID}/${SNo}/${val.EID}`,
                          val.EpisodeNumber,
                          SNo
                        );
                      }}
                    >
                      <EpisodeCard
                        key={index}
                        ENo={val.EpisodeNumber}
                        Ename={val.EpisodeName}
                        Eduration={val.Episode_Length}
                        Lang={val.Lang}
                        class={EpNo == val.EpisodeNumber ? "active" : ""}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="All-Episode">
          <div className="season">
            <div className="list-season">
              {TotalSeason.map((val, index) => {
                return (
                  <p
                    onClick={() => {
                      getAllEpisode(val);
                    }}
                    className={val == selectedSeason ? "active" : ""}
                  >
                    S{val}
                  </p>
                );
              })}
            </div>
            <div className="episodes">
              {ep_list.map((val, index) => {
                return (
                  <a
                    // href={`/PlayEpisode/${val.EpisodeNumber}/${AID}/${selectedSeason}`}

                    onClick={(e) => {
                      openEpisode(
                        `/PlayEpisode/${val.EpisodeNumber}/${AID}/${selectedSeason}/${val.EID}`
                      );
                    }}
                    className={
                      "ep " +
                      (EpNo == val.EpisodeNumber && SNo == val.SeasonNumber
                        ? "active"
                        : "")
                    }
                  >
                    <p>{val.EpisodeNumber}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

     
      </section>
      <Footer />
    </section>
  );
}

export default PlayEpisode;
