import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import style from "./Style/AddAnime/AddAnime.css";

// Components
import SideNav from "./SideNav";
import IconsLinks from "../../IconLinks";
import { useNavigate } from "react-router";

function AddAnime() {
  const navigate = useNavigate();

  // media
  const [AnimePosterImg, setAnimePosterImg] = useState(null);
  const [AnimeCoverImg, setAnimeCoverImg] = useState(null);
  const [AnimeTrailerLink, setAnimeTrailerLink] = useState(null);
  const [AnimeClip, setAnimeClip] = useState(null);

  // text
  const [AnimeTitle, setAnimeTitle] = useState();
  const [AnimeDesc, setAnimeDesc] = useState();
  const [AnimeTitleLanguage, setAnimeTitleLanguage] = useState("subbed");
  const [AnimeEpisode, setAnimeEpisode] = useState();
  const [AnimeSeason, setAnimeSeason] = useState();
  const [AnimeGenre, setAnimeGenre] = useState("Shounen");
  const [AnimeEpisodeLength, setAnimeEpisodeLength] = useState();
  const [AnimeDate, setAnimeDate] = useState();
  const [AnimeIMDB, setAnimeIMDB] = useState();
  const [AnimeTags, setAnimeTags] = useState();
  const [AnimeStatus, setAnimeStatus] = useState("On Going");

  const [dyanamicPoster, setDyanamicPoster] = useState(null);
  const [dyanamicCoverPage, setDyanamicCoverPage] = useState(null);
  const [dyanamicTrailerVideo, setDyanamicTrailerVideo] = useState(null);
  const [dyanamicClip, setDyanamicClip] = useState(null);
  // set the usestate data..
  const setData = (e) => {
    console.log(e.target.name);

    let n = e.target.name;
    console.log(e.target.files[0]);
    switch (n) {
      case "poster":
        // console.log(e.target.files[0]);
        setAnimePosterImg(e.target.files[0]);
        setDyanamicPoster(URL.createObjectURL(e.target.files[0]));

        break;

      case "coverPage":
        console.log(e.target.files[0]);
        setDyanamicCoverPage(URL.createObjectURL(e.target.files[0]));
        setAnimeCoverImg(e.target.files[0]);
        break;

      case "TrailerVideo":
        setAnimeTrailerLink(e.target.files[0]);
        setDyanamicTrailerVideo(URL.createObjectURL(e.target.files[0]));
        break;

      case "Clip":
        setAnimeClip(e.target.files[0]);
        setDyanamicClip(URL.createObjectURL(e.target.files[0]));
        break;
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (AnimePosterImg == null) {
      alert("select Anime Poster plz..");
      return;
    } else if (AnimeCoverImg == null) {
      alert("select Anime Cover plz..");
      return;
    } else if (AnimeTrailerLink == null) {
      alert("select Anime Trailer plz..");
      return;
    } else if (AnimeClip == null) {
      alert("select Anime Clip plz..");
      return;
    }

    // setting the data in form to send it to server...
    var formData = new FormData();
    formData.append("poster", AnimePosterImg);
    formData.append("coverPage", AnimeCoverImg);
    formData.append("TrailerVideo", AnimeTrailerLink);
    formData.append("Clip", AnimeClip);
    formData.append("title", AnimeTitle);
    formData.append("Desc", AnimeDesc);
    formData.append("Lang", AnimeTitleLanguage);
    formData.append("genre", AnimeGenre);
    formData.append("seasons", AnimeSeason);
    formData.append("episodes", AnimeEpisode);
    formData.append("IMDB", AnimeIMDB);
    formData.append("episode_length", AnimeEpisodeLength);
    formData.append("ReleaseDate", AnimeDate);
    formData.append("Status", AnimeStatus);

    formData.append("tags", AnimeTags);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "http://localhost:3002/register",
      formData,
      config
    );
    console.log(res);
    console.log(res.data.status);
    if (res.data.status == 201) {
      alert("anime added succesfully");
      navigate(0);
    } else {
      alert("error");
    }
  };

  const win = window.sessionStorage;
  const nav = useNavigate();
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };
  useEffect(() => {
    checkForLogin();
  }, []);

  return (
    <div className="AddAnime admin" style={style}>
      <div className="banner">
        <h1 className="logo">ANIME</h1>
        <ul>
          <li>
            <a style={{ opacity: "40%" }} href="http://localhost:3000/addAnime">
              Dashboard/
            </a>
          </li>
          <li>
            <a href="">Add Anime</a>
          </li>
        </ul>

        <h1>Add Anime</h1>
      </div>
      <form onSubmit={submitData} style={style}>
        <div className="sections">
          <div className="section1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              onChange={(e) => {
                setAnimeTitle(e.target.value);
              }}
            />
            <textarea
              name="desc"
              placeholder="Description"
              id=""
              cols="30"
              rows="10"
              required
              onChange={(e) => {
                setAnimeDesc(e.target.value);
              }}
            ></textarea>
            {/* Radio btns */}
            <div className="radioGrp">
              <input
                type="radio"
                onChange={(e) => {
                  setAnimeTitleLanguage(e.target.value);
                }}
                value="subbed"
                name="Lang"
                id=""
              />
              <label htmlFor="">Subbed</label>

              <input
                type="radio"
                name="Lang"
                value="Dubbed"
                onChange={(e) => {
                  setAnimeTitleLanguage(e.target.value);
                }}
              />
              <label htmlFor="">Dubbed</label>
            </div>
            {/* Genre */}

            <select
              name="genre"
              defaultValue={"Shounen"}
              onClick={(e) => {
                setAnimeGenre(e.target.value);
                console.log(AnimeGenre);
              }}
            >
              <option value="Shounen">Shounen</option>
              <option value="Seinen">Seinen</option>
              <option value="Isekai">Isekai</option>
              <option value="Shoujo">Shoujo</option>
              <option value="Slice of life">Slice of life</option>
            </select>

            <input
              type="number"
              name="seasons"
              placeholder="Number Seasons"
              id=""
              required
              onChange={(e) => {
                setAnimeSeason(e.target.value);
              }}
            />
            <input
              type="number"
              name="episodes"
              placeholder="Number episodes"
              id=""
              required
              onChange={(e) => {
                setAnimeEpisode(e.target.value);
              }}
            />
            <input
              type="number"
              name="episode_length"
              placeholder="Episode Length"
              id=""
              required
              onChange={(e) => {
                setAnimeEpisodeLength(e.target.value);
              }}
            />
            <input
              type="number"
              name="IMDB"
              placeholder="IMDB Rating"
              id=""
              required
              onChange={(e) => {
                setAnimeIMDB(e.target.value);
              }}
            />

            <select
              name="Status"
              defaultValue={"On Going"}
              onClick={(e) => {
                setAnimeStatus(e.target.value);
                console.log(AnimeStatus);
              }}
            >
              <option value="On Going">On Going</option>
              <option value="Completed">Completed</option>
            </select>

            <input
              type="date"
              name="ReleaseDate"
              id=""
              required
              onChange={(e) => {
                setAnimeDate(e.target.value);
              }}
            />

            {/* Tags */}
            <textarea
              name="tags"
              placeholder="Tags"
              id=""
              cols="30"
              rows="10"
              required
              onChange={(e) => {
                setAnimeTags(e.target.value);
              }}
            ></textarea>
          </div>

          {/* section-2 */}
          <div className="section2">
            <label htmlFor="poster">
              <div className="img-container">
                <img
                  style={
                    dyanamicPoster != null
                      ? {
                          width: "100%",
                        }
                      : {
                          width: "30%",
                        }
                  }
                  src={
                    dyanamicPoster != null ? dyanamicPoster : IconsLinks.addImg
                  }
                  alt=""
                />
              </div>
              Upload Anime Poster
              <input
                accept="image/*"
                type="file"
                name="poster"
                id="poster"
                onChange={setData}
              />
            </label>

            <label htmlFor="coverPage">
              <div
                style={{ height: "200px", width: "50%" }}
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
              Upload Anime Cover Page
              <input
                type="file"
                name="coverPage"
                id="coverPage"
                onChange={setData}
                accept="image/*"
              />
            </label>
            <label htmlFor="TrailerVideo">
              <div
                style={{ height: "200px", width: "50%" }}
                className="img-container"
              >
                <video
                  controls
                  style={
                    dyanamicTrailerVideo != null
                      ? {
                          width: "100%",
                        }
                      : {
                          width: "30%",
                        }
                  }
                  src={
                    dyanamicTrailerVideo != null
                      ? dyanamicTrailerVideo
                      : IconsLinks.addImg
                  }
                />
              </div>
              Upload Anime Trailer Video
              <input
                type="file"
                name="TrailerVideo"
                id="TrailerVideo"
                onChange={setData}
                accept="video/*"
              />
            </label>

            <label htmlFor="Clip">
              <div
                style={{ height: "200px", width: "50%" }}
                className="img-container"
              >
                <video
                  controls
                  style={
                    dyanamicClip != null
                      ? {
                          width: "100%",
                        }
                      : {
                          width: "30%",
                        }
                  }
                  src={dyanamicClip != null ? dyanamicClip : IconsLinks.addImg}
                />
              </div>
              Upload Anime Video Clip
              <input
                type="file"
                name="Clip"
                id="Clip"
                onChange={setData}
                accept="video/*"
              />
            </label>
          </div>
        </div>

        <button type="submit">Add Anime</button>
      </form>
    </div>
  );
}

export default AddAnime;
