import React, { useEffect, useState } from "react";
import style from "./style/DeleteEpisode.css";
import IconsLinks from "../../../IconLinks";
import DeleteCard from "./EditCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import EditCard from "./EditCard";
const EditEpisode = () => {
  const [EpData, setEpData] = useState([]);
  const [EpData2, setEpData2] = useState({});
  const { AID } = useParams();
  const navigate = useNavigate();
  let ar = [];
  const [season, setSeason] = useState([]);

  const getSeasonInfo = async () => {
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
  };
  const { key } = useParams();
  const getData = (Sno) => {
    if (key != null) {
      axios
        .get(`http://localhost:3002/searchEpisode/${AID}/${key}`)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            setEpData(res.data);
            setEpData2(res.data[0]);
          } else {
            setEpData(null);
            alert("No Episodes Found");
            return;
          }
        });
    } else {
      axios
        .get(`http://localhost:3002/getEpisode/${AID}/${Sno}`)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            setEpData(res.data);
            setEpData2(res.data[0]);
          } else {
            setEpData(null);
            alert("No Episodes Found");
            navigate(0);
          }
        });
    }
  };

  const changeSeason = (e) => {
    // console.log(e.target.value);
    getData(e.target.value);
  };

  const nav = useNavigate();
  const win = window.sessionStorage;
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };

  const [searchKey, setsearchKey] = useState();
  const search = (e) => {
    nav(`/EditEpisode/${AID}/${searchKey}`);
  };

  useEffect(() => {
    checkForLogin();
    getData(1);
    getSeasonInfo();
  }, []);

  return (
    <section className="DeleteEpisode admin-bg admin">
      <div className="admin-nav">
        <h1 className="logo">ANIME</h1>
        <ul>
          <li>
            <a
              style={{ opacity: "40%" }}
              href="http://localhost:3000/dashboard"
            >
              Dashboard/
            </a>
          </li>
          <li>
            <a
              style={{ opacity: "40%" }}
              href="http://localhost:3000/addEpisode"
            >
              View Episodes/
            </a>
          </li>
          <li>
            <a href="">View Animes</a>
          </li>
        </ul>

        <form onSubmit={search} action="">
          <h1>Add Episodes</h1>
          <div className="search-btn">
            <input
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
              type="search"
              placeholder="search animes"
            />
            <button type="submit">
              <img src={IconsLinks.black_search} alt="" />
            </button>
          </div>
        </form>
      </div>

      <div className="delCard-container">
        <div className="top-section">
          <h1>{EpData2.Title}</h1>
          <div className="season">
            <p>Season</p>
            <select name="" id="" onChange={changeSeason}>
              <option value={EpData2.SeasonNumber}>
                {EpData2.SeasonNumber}
              </option>

              {season.map((val, index) => {
                return EpData2.SeasonNumber != val ? (
                  <option value={val}>{val}</option>
                ) : (
                  ""
                );
              })}
            </select>
          </div>
        </div>
        {EpData != null
          ? EpData.map((val, index) => {
              return (
                <div key={index}>
                  <EditCard
                    EID={val.EID}
                    EpNo={val.EpisodeNumber}
                    Desc={val.EpisodeName}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </section>
  );
};

export default EditEpisode;
