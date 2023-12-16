import React from "react";

import { useEffect, useState } from "react";
import SideNav from "../SideNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import IconsLinks from "../../../IconLinks";

//! style...
import style from "../Style/AddAnime/AddAnime.css";
import style1 from "../Style/AddEpisode/AddEpisode.css";

function Episodes() {
  const navigate = useNavigate();
  const { AID } = useParams();
  const { AnimeName } = useParams();

  // Media
  const [CoverImg, setCoverImg] = useState(null);
  const [VideoLink1080, setVideoLink1080] = useState(null);
  const [VideoLink720, setVideoLink720] = useState(null);
  const [VideoLink480, setVideoLink480] = useState(null);

  const [dyanamicEpisodeLink1080, setDyanamicEpisodeLink1080] = useState(null);
  const [dyanamicEpisodeLink720, setDyanamicEpisodeLink720] = useState(null);
  const [dyanamicEpisodeLink480, setDyanamicEpisodeLink480] = useState(null);
  const [dyanamicCoverPage, setDyanamicCoverPage] = useState(null);

  const setEp1080 = (e) => {
    setVideoLink1080(e.target.files[0]);
    setDyanamicEpisodeLink1080(URL.createObjectURL(e.target.files[0]));
  };

  const setEp720 = (e) => {
    setVideoLink720(e.target.files[0]);
    setDyanamicEpisodeLink720(URL.createObjectURL(e.target.files[0]));
  };

  const setEp480 = (e) => {
    setVideoLink480(e.target.files[0]);
    setDyanamicEpisodeLink480(URL.createObjectURL(e.target.files[0]));
  };

  const setCover = (e) => {
    setCoverImg(e.target.files[0]);

    setDyanamicCoverPage(URL.createObjectURL(e.target.files[0]));
  };

  // text
  const [EpName, setEpName] = useState();
  const [EpNo, setEpNo] = useState();
  const [SeasonNo, setSeasonNo] = useState("1");
  const [spinnerFlag, setspinnerFlag] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    setspinnerFlag(true);
    if (CoverImg == null) {
      alert("select Cover Page plz..");
      return;
    } else if (VideoLink1080 == null) {
      alert("select video from 1080px plz..");
      return;
    } else if (VideoLink720 == null) {
      alert("select video from 720px plz..");
      return;
    } else if (VideoLink480 == null) {
      alert("select video from 480px plz..");
      return;
    }

    var formData = new FormData();

    formData.append("EpName", EpName);
    formData.append("EpNo", EpNo);
    formData.append("SeasonNo", SeasonNo);
    formData.append("VideoLink1080", VideoLink1080);
    formData.append("VideoLink720", VideoLink720);
    formData.append("VideoLink480", VideoLink480);
    formData.append("CoverImg", CoverImg);
    formData.append("AnimeID", AID);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "http://localhost:3002/NewEpisode/" + AnimeName,
      formData,
      config
    );
    console.log(res);

    if (res.data.status == 201) {
      await setspinnerFlag(false);
      alert("Episode added succesfully");
      navigate(0);
    } else {
      await setspinnerFlag(false);
      alert("error");
    }
  };

  // This ar is used to get the number of seasons
  let ar = [];
  const [season, setSeason] = useState([]);

  const getCardData = async () => {
    const res = await axios.get(`http://localhost:3002/AnimeDesc/${AID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(res1.data[0].Seasons);
    let seasonNo = res.data[0].Seasons;
    let i = 0;
    let count = 1;
    while (i < seasonNo) {
      ar[i] = count;
      count++;
      i++;
    }

    setSeason(ar);

    console.log(season);
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <>
      <div style={style1} className="episode-form admin">
        <div className="banner">
          <h1 className="logo">ANIME</h1>

          <ul>
            <li style={{ opacity: "60%", color: "black" }}>
              <a href="http://localhost:3000/dashboard">Dashboard/</a>
            </li>
            <li style={{ opacity: "60%", color: "black" }}>
              <a href="http://localhost:3000/addEpisode">Add Episode/</a>
            </li>
            <li>
              <a href="">Episode</a>
            </li>
          </ul>

          <h1>Add Episode</h1>
        </div>

        <div className={spinnerFlag ? "loading active" : "loading"}>
          <div className={spinnerFlag ? "spinner active" : "spinner"}>
            <img src={IconsLinks.loadingWhite} alt="" />
          </div>
        </div>

        <form onSubmit={submitData}>
          <div className="sections">
            <div className="section1">
              <input
                type="text"
                placeholder="Episode name"
                name="EpName"
                onChange={(e) => {
                  setEpName(e.target.value);
                }}
                required
              />

              <input
                type="number"
                placeholder="Episode Number"
                name="EpNo"
                onChange={(e) => {
                  setEpNo(e.target.value);
                }}
                required
              />

              <select
                name="SeasonNo"
                id=""
                onChange={(e) => {
                  setSeasonNo(e.target.value);
                }}
              >
                {season.map((val, index) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>
            </div>

            <div className="section2">
              <label htmlFor="CoverImg">
                <div
                  style={{ height: "500px", width: "60%" }}
                  className="img-container"
                >
                  <img
                    style={
                      dyanamicCoverPage != null
                        ? {
                            width: "100%",
                          }
                        : {
                            width: "30%",
                          }
                    }
                    src={
                      dyanamicCoverPage != null
                        ? dyanamicCoverPage
                        : IconsLinks.addImg
                    }
                    alt=""
                  />
                </div>
                Cover Image
                <input
                  type="file"
                  placeholder="Season Number"
                  name="CoverImg"
                  id="CoverImg"
                  onChange={setCover}
                  accept="image/*"
                />
              </label>

              <div className="videoLinks">
                <label htmlFor="VideoLink1080">
                  <div className="video-container">
                    <video
                      controls
                      src={
                        dyanamicEpisodeLink1080 != null
                          ? dyanamicEpisodeLink1080
                          : ""
                      }
                    />
                  </div>
                  1080px Video Link
                  <input
                    type="file"
                    placeholder="Season Number"
                    name="VideoLink1080"
                    onChange={setEp1080}
                    id="VideoLink1080"
                    accept="video/*"
                  />
                </label>

                <label htmlFor="VideoLink720">
                  <div className="video-container">
                    <video
                      controls
                      src={
                        dyanamicEpisodeLink720 != null
                          ? dyanamicEpisodeLink720
                          : ""
                      }
                    />
                  </div>
                  720px Video Link
                  <input
                    type="file"
                    placeholder="Season Number"
                    name="VideoLink720"
                    onChange={setEp720}
                    id="VideoLink720"
                    accept="video/*"
                  />
                </label>

                <label htmlFor="VideoLink480">
                  <div className="video-container">
                    <video
                      controls
                      src={
                        dyanamicEpisodeLink480 != null
                          ? dyanamicEpisodeLink480
                          : ""
                      }
                    />
                  </div>
                  480px Video Link
                  <input
                    type="file"
                    placeholder="Season Number"
                    name="VideoLink480"
                    onChange={setEp480}
                    id="VideoLink480"
                    accept="video/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <button type="submit">Add Episode</button>
        </form>
      </div>
    </>
  );
}

export default Episodes;
