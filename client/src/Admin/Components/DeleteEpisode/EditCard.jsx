import React, { useEffect, useRef, useState } from "react";
import style from "./style/DeleteCard.css";
import IconsLinks from "../../../IconLinks";
import ImgLinks from "../../../ImgLinks";
import axios from "axios";
import { useNavigate } from "react-router";
import ReactPlayer from "react-player";
const EditCard = (props) => {
  const navigate = useNavigate();

  const [EpNo, setEpNo] = useState(null);
  const [EpName, setEpName] = useState(null);
  const [EpSeason, setEpSeason] = useState(null);
  const [EpCoverPage, setEpCoverPage] = useState(null);
  const [EpVideoLink1080, setEpVideoLink1080] = useState(null);
  const [EpVideoLink720, setEpVideoLink720] = useState(null);
  const [EpVideoLink480, setEpVideoLink480] = useState(null);

  const deleteEpisode = (EID) => {
    // delete ep here..

    let ep = window.prompt("Enter Episode number..");

    if (ep == props.EpNo) {
      const res = axios
        .get(`http://localhost:3002/deleteEpisode/${EID}`)
        .then((res) => {
          console.log(res);
          navigate(0);
        });
    }
  };

  const [EpData, setEpData] = useState({});
  const [videoStyle, setVideoStyle] = useState("video-container");
  const [FormStyle, setFormStyle] = useState("editForm");
  const getVideoData = () => {
    axios
      .get(`http://localhost:3002/getSingleEpisode/${props.EID}`)
      .then((res) => {
        console.log(res);
        setEpData(res.data[0]);
      });

    setVideoStyle("video-container active");
  };

  // dyanamically load cover page..
  const [DyanamicCoverpage, setDyanamicCoverpage] = useState(null);
  const setCoverPage = (e) => {
    setDyanamicCoverpage(URL.createObjectURL(e.target.files[0]));
    setEpCoverPage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // dyanamically load path of video locally...
  const [DyanamicEpisodeLink1080, setDyanamicEpisodeLink1080] = useState(null);
  const [DyanamicEpisodeLink720, setDyanamicEpisodeLink720] = useState(null);
  const [DyanamicEpisodeLink480, setDyanamicEpisodeLink480] = useState(null);
  const setVideo1080 = (e) => {
    e.preventDefault();
    console.log("1080px");

    setDyanamicEpisodeLink1080(URL.createObjectURL(e.target.files[0]));
    setEpVideoLink1080(e.target.files[0]);
  };
  const setVideo720 = (e) => {
    e.preventDefault();
    console.log("720px");
    setDyanamicEpisodeLink720(URL.createObjectURL(e.target.files[0]));
    setEpVideoLink720(e.target.files[0]);
  };
  const setVideo480 = (e) => {
    e.preventDefault();
    console.log("480px");

    setDyanamicEpisodeLink480(URL.createObjectURL(e.target.files[0]));
    setEpVideoLink480(e.target.files[0]);
  };

  let ar = [];
  const [season, setSeason] = useState([]);
  const getEpData = () => {
    axios
      .get(`http://localhost:3002/getSingleEpisode/${props.EID}`)
      .then((res) => {
        console.log(res);
        setEpData(res.data[0]);
        setDyanamicCoverpage(
          `http://localhost:3002/uploads/Episode/CoverImg/${res.data[0].Title}/${res.data[0].CoverImage}`
        );

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
      });

    setFormStyle("editForm active");
  };

  // `http://localhost:3002/uploads/Episode/CoverImg/${EpData.Title}/${EpData.CoverImage}`

  const videoPlayer = useRef(null);
  const close = () => {
    setVideoStyle("video-container");
    videoPlayer.current.pause();
  };
  const close1 = () => {
    setFormStyle("editForm");
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("EpNo", EpNo);
    formData.append("EpName", EpName);
    formData.append("EpSeason", EpSeason);
    formData.append("CoverImg", EpCoverPage);
    formData.append("VideoLink1080", EpVideoLink1080);
    formData.append("VideoLink720", EpVideoLink720);
    formData.append("VideoLink480", EpVideoLink480);

    console.log(formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `http://localhost:3002/updateEpisode/${props.EID}`,
      formData,
      config
    );
    console.log(res);
  };

  useEffect(() => {}, []);

  return (
    <div className="DeleteCard">
      <div className="left">
        <div className="sr-no">
          <p>{props.EpNo < 10 ? "0" + props.EpNo : props.EpNo}</p>
        </div>
        <div className="info">
          <h1>Episode {props.EpNo}</h1>
          <p>
            {props.Desc < 20
              ? props.Desc
              : props.Desc.substr(0, 50).concat("..")}{" "}
          </p>
        </div>
      </div>
      <div className="right">
        <div className="play-btn">
          <a onClick={getVideoData}>
            <img src={IconsLinks.playBtn} alt="" />
          </a>
        </div>
        <button className="delete-btn edit-btn" onClick={getEpData}>
          <img src={IconsLinks.edit} alt="" />
          Edit
        </button>
        <button
          onClick={() => {
            deleteEpisode(props.EID);
          }}
          className="delete-btn"
        >
          <img src={IconsLinks.Delete} alt="" />
          DELETE
        </button>
      </div>
      <div className={videoStyle}>
        <div className="overlay"></div>
        <div onClick={close} className="close-btn">
          <img src={IconsLinks.close} alt="" />
        </div>
        <video
          ref={videoPlayer}
          src={`http://localhost:3002/uploads/Episode/EpisodeVideo/${EpData.Title}/1080/${EpData.VideoLink}`}
          controls
        ></video>
      </div>

      <div className={FormStyle}>
        <h1>Edit Episode</h1>
        <form>
          <div onClick={close1} className="close-btn">
            <img src={IconsLinks.close} alt="" />
          </div>
          <div className="content">
            <div className="section1">
              <label htmlFor="cover-img" className="cover-img">
                <div style={{ zIndex: "1" }} className="img-container">
                  <div className="overlay">
                    <img style={{ width: "5%" }} src={IconsLinks.edit} alt="" />
                    <p>Cover Image</p>
                  </div>
                  <img src={DyanamicCoverpage} alt="" />
                </div>
                <input
                  onChange={setCoverPage}
                  type="file"
                  name="CoverImg"
                  id="cover-img"
                />
              </label>
            </div>
            <div className="section2">
              <label htmlFor="">Episode Name</label>

              <input
                type="text"
                defaultValue={EpData.EpisodeName}
                name="EpName"
                id=""
                placeholder="Episode Name"
                onChange={(e) => {
                  setEpName(e.target.value);
                }}
              />
              <label htmlFor="">Episode Number</label>
              <input
                defaultValue={EpData.EpisodeNumber}
                type="text"
                name="EpNo"
                id=""
                placeholder="Episode Number"
                onChange={(e) => {
                  setEpNo(e.target.value);
                }}
              />
              <select
                onChange={(e) => {
                  setEpSeason(e.target.value);
                }}
                elect
                name="EpSeason"
                id=""
              >
                <option value={EpData.SeasonNumber}>
                  {EpData.SeasonNumber}
                </option>

                {season.map((val, index) => {
                  return EpData.SeasonNumber != val ? (
                    <option value={val}>{val}</option>
                  ) : (
                    ""
                  );
                })}
              </select>
              <label htmlFor="">Resolution 1080px</label>
              <video
                src={
                  DyanamicEpisodeLink1080 != null
                    ? DyanamicEpisodeLink1080
                    : `http://localhost:3002/uploads/Episode/EpisodeVideo/${EpData.Title}/1080/${EpData.VideoLink1080}`
                }
                controls
              ></video>
              <label htmlFor="videofile1080" className="videofile">
                New Video
                <input
                  onChange={setVideo1080}
                  type="file"
                  name="VideoLink"
                  id="videofile1080"
                />
              </label>

              <label htmlFor="">Resolution 720px</label>

              <video
                src={
                  DyanamicEpisodeLink720 != null
                    ? DyanamicEpisodeLink720
                    : `http://localhost:3002/uploads/Episode/EpisodeVideo/${EpData.Title}/720/${EpData.VideoLink720}`
                }
                controls
              ></video>
              <label htmlFor="videofile720" className="videofile">
                New Video
                <input
                  onChange={setVideo720}
                  type="file"
                  name="VideoLink"
                  id="videofile720"
                />
              </label>

              <label htmlFor="">Resolution 480px</label>

              <video
                src={
                  DyanamicEpisodeLink480 != null
                    ? DyanamicEpisodeLink480
                    : `http://localhost:3002/uploads/Episode/EpisodeVideo/${EpData.Title}/480/${EpData.VideoLink480}`
                }
                controls
              ></video>
              <label htmlFor="videofile480" className="videofile">
                New Video
                <input
                  onChange={setVideo480}
                  type="file"
                  name="VideoLink"
                  id="videofile480"
                />
              </label>

              <button type="submit" onClick={saveChanges}>
                save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
