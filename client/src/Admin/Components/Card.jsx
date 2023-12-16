import React, { useRef, useState } from "react";
import axios from "axios";

import CardsStyle from "./Style/Card/Card.css";
import IconsLinks from "../../IconLinks";
import { useNavigate } from "react-router";

function Card(props) {
  const navigate = useNavigate();
  const AID = props.AID;
  
  const [AnimeCoverPage, setAnimeCoverPage] = useState(null);
  const [AnimePoster, setAnimePoster] = useState(null);
  const [AnimeTrailerLink, setAnimeTrailerLink] = useState(null);
  const [AnimeClipLink, setAnimeClipLink] = useState(null);

  const [AnimeTitle, setAnimeTitle] = useState(null);
  const [AnimeDesc, setAnimeDesc] = useState(null);
  const [AnimeLanguage, setAnimeLanguage] = useState(null);
  const [AnimeEpisode, setAnimeEpisode] = useState(null);
  const [AnimeSeason, setAnimeSeason] = useState(null);
  const [AnimeGenre, setAnimeGenre] = useState(null);
  const [AnimeEpisodeLength, setAnimeEpisodeLength] = useState(null);
  const [AnimeDate, setAnimeDate] = useState(null);
  const [AnimeIMDB, setAnimeIMDB] = useState(null);
  const [AnimeTags, setAnimeTags] = useState(null);
  const [AnimeStatus, setAnimeStatus] = useState(null);

  const [AnimeData, setAnimeData] = useState({});
  const [FormStyle, setFormStyle] = useState("editForm");

  // dyanamically load cover page..
  const [DyanamicCoverpage, setDyanamicCoverpage] = useState(null);
  const setCoverPage = (e) => {
    setDyanamicCoverpage(URL.createObjectURL(e.target.files[0]));
    setAnimeCoverPage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const [DyanamicPosterpage, setDyanamicPosterpage] = useState(null);
  const setPosterPage = (e) => {
    setDyanamicPosterpage(URL.createObjectURL(e.target.files[0]));
    setAnimePoster(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // dyanamically load path of video locally...
  const [DyanamicTrailerLink, setDyanamicTrailerLink] = useState(null);
  const setTrailer = (e) => {
    setDyanamicTrailerLink(URL.createObjectURL(e.target.files[0]));
    setAnimeTrailerLink(e.target.files[0]);
  };

  const [DyanamicClipLink, setDyanamicClipLink] = useState(null);
  const setClip = (e) => {
    setDyanamicClipLink(URL.createObjectURL(e.target.files[0]));
    setAnimeClipLink(e.target.files[0]);
  };

  const subbed = useRef();
  const dubbed = useRef();
  const Shounen = useRef();
  const Seinen = useRef();
  const Isekai = useRef();
  const Shoujo = useRef();
  const Sliceoflife = useRef();
  const OnGoing = useRef();
  const Completed = useRef();

  //! get Anime data..
  const getAnimeData = () => {
    axios.get(`http://localhost:3002/AnimeDesc/${AID}`).then((res) => {
      setAnimeData(res.data[0]);
      setDyanamicCoverpage(
        `http://localhost:3002/uploads/Cover/${res.data[0].Cover_Image}`
      );
      setDyanamicPosterpage(
        `http://localhost:3002/uploads/Posters/${res.data[0].Poster_Image}`
      );

      if (res.data[0].Lang == "Dubbed") {
        dubbed.current.checked = true;
      } else subbed.current.checked = true;

      console.log(Shounen);
      if (res.data[0].Genre == "Shounen") {
        Shounen.current.selected = true;
      } else if (res.data[0].Genre == "Isekai") {
        Isekai.current.selected = true;
      } else if (res.data[0].Genre == "Slice of life") {
        Sliceoflife.current.selected = true;
      } else if (res.data[0].Genre == "Shoujo") {
        Shoujo.current.selected = true;
      } else if (res.data[0].Genre == "Seinen") {
        Seinen.current.selected = true;
      }

      if (res.data[0].Status == "Completed") {
        Completed.current.selected = true;
      } else OnGoing.current.selected = true;

      console.log(res);
    });

    setFormStyle("editForm active");
  };

  const close1 = () => {
    setFormStyle("editForm");
  };

  //! save changes..
  const saveChanges = async (e) => {
    e.preventDefault();
    var formData = new FormData();

    formData.append("AnimeCoverPage", AnimeCoverPage);
    formData.append("AnimeTrailerLink", AnimeTrailerLink);
    formData.append("AnimePoster", AnimePoster);
    formData.append("AnimeClipLink", AnimeClipLink);
    formData.append("AnimeTitle", AnimeTitle);
    formData.append("AnimeDesc", AnimeDesc);
    formData.append("AnimeLanguage", AnimeLanguage);
    formData.append("AnimeEpisode", AnimeEpisode);
    formData.append("AnimeSeason", AnimeSeason);
    formData.append("AnimeGenre", AnimeGenre);
    formData.append("AnimeEpisodeLength", AnimeEpisodeLength);
    formData.append("AnimeDate", AnimeDate);
    formData.append("AnimeIMDB", AnimeIMDB);
    formData.append("AnimeTags", AnimeTags);
    formData.append("AnimeStatus", AnimeStatus);

    console.log(formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `http://localhost:3002/updateAnime/${props.AID}`,
      formData,
      config
    );
    console.log(res);
  };

  //! Delete Anime..
  const deleteAnime = () => {
    let anime = window.prompt("Enter anime name..");

    if (anime === props.Title) {
      // delete the anime..
      axios
        .get(`http://localhost:3002/deleteAnime/${props.AID}`)
        .then((res) => {
          console.log(res);
          navigate(0);
        });

      // if (res.data.status == 201) {
      //   alert("anime added succesfully");
      //   navigate(0);
      // } else {
      //   alert("error");
      // }
    }
  };

  return (
    <div className="AnimeListCard">
      <div className="card" style={CardsStyle}>
        <div className="img-container">
          <img
            src={`http://localhost:3002/uploads/Posters/${props.ImgLink}`}
            alt=""
          />
        </div>

        <div className="content">
          <p>Shounen</p>
          <h1>{props.Title}</h1>
          <span>
            <div className="circle"></div>
            <p>Imdb 9/10</p>
          </span>
        </div>

        <div className="Btns">
          <button className="Edit-Btn" onClick={getAnimeData}>
            Edit
          </button>
          <button className="Delete-Btn" onClick={deleteAnime}>
            Delete
          </button>
        </div>
      </div>
      <div className={FormStyle}>
        <h1>Edit ANime</h1>
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
                  name="AnimeCoverPage"
                  id="cover-img"
                />
              </label>

              <label htmlFor="poster-img" className="poster-img">
                <div style={{ zIndex: "1" }} className="img-container">
                  <div className="overlay">
                    <img
                      style={{ width: "10%" }}
                      src={IconsLinks.edit}
                      alt=""
                    />
                    <p>Poster Image</p>
                  </div>
                  <img src={DyanamicPosterpage} alt="" />
                </div>
                <input
                  onChange={setPosterPage}
                  type="file"
                  name="AnimePoster"
                  id="poster-img"
                />
              </label>
            </div>
            <div className="section2">
              <label htmlFor="">Anime Name</label>
              <input
                type="text"
                defaultValue={AnimeData.Title}
                name="AnimeTitle"
                id=""
                placeholder="Anime Title"
                onChange={(e) => {
                  setAnimeTitle(e.target.value);
                }}
              />
              <label htmlFor="">Description</label>
              <textarea
                defaultValue={AnimeData.Description}
                name="AnimeDesc"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setAnimeDesc(e.target.value);
                }}
              ></textarea>

              <label htmlFor="">Language</label>
              {/* Radio btns */}
              <div className="radioGrp">
                <input
                  type="radio"
                  onChange={(e) => {
                    setAnimeLanguage(e.target.value);
                  }}
                  value="subbed"
                  name="AnimeLanguage"
                  id=""
                  ref={subbed}
                />
                <label htmlFor="">Subbed</label>

                <input
                  type="radio"
                  name="AnimeLanguage"
                  value="Dubbed"
                  ref={dubbed}
                  onChange={(e) => {
                    setAnimeLanguage(e.target.value);
                  }}
                />
                <label htmlFor="">Dubbed</label>
              </div>
              {/* Genre */}

              <label htmlFor="">Genre</label>

              <select
                name="AnimeGenre"
                defaultValue={"Shounen"}
                onClick={(e) => {
                  setAnimeGenre(e.target.value);
                }}
              >
                <option ref={Shounen} value="Shounen">
                  Shounen
                </option>
                <option ref={Seinen} value="Seinen">
                  Seinen
                </option>
                <option ref={Isekai} value="Isekai">
                  Isekai
                </option>
                <option ref={Shoujo} value="Shoujo">
                  Shoujo
                </option>
                <option ref={Sliceoflife} value="Slice of life">
                  Slice of life
                </option>
              </select>

              <label htmlFor="">Number Seasons</label>

              <input
                type="number"
                name="AnimeSeason"
                placeholder="Number Seasons"
                id=""
                defaultValue={AnimeData.Seasons}
                onChange={(e) => {
                  setAnimeSeason(e.target.value);
                }}
              />

              <label htmlFor="">Number episodes</label>

              <input
                type="number"
                name="AnimeEpisode"
                placeholder="Number episodes"
                id=""
                defaultValue={AnimeData.Episodes}
                onChange={(e) => {
                  setAnimeEpisode(e.target.value);
                }}
              />

              <label htmlFor="">Episode Length</label>

              <input
                type="number"
                name="AnimeEpisodeLength"
                placeholder="Episode Length"
                defaultValue={AnimeData.Episode_Length}
                id=""
                onChange={(e) => {
                  setAnimeEpisodeLength(e.target.value);
                }}
              />

              <label htmlFor="">IMDB Rating</label>

              <input
                type="number"
                name="AnimeIMDB"
                placeholder="IMDB Rating"
                defaultValue={AnimeData.IMDB_Rating}
                id=""
                onChange={(e) => {
                  setAnimeIMDB(e.target.value);
                }}
              />

              <label htmlFor="">Anime Status</label>

              <select
                name="AnimeStatus"
                defaultValue={"On Going"}
                onClick={(e) => {
                  setAnimeStatus(e.target.value);
                }}
              >
                <option ref={OnGoing} value="On Going">
                  On Going
                </option>
                <option ref={Completed} value="Completed">
                  Completed
                </option>
              </select>

              <label htmlFor="">Release Date</label>

              <input
                type="date"
                name="AnimeDate"
                defaultValue={AnimeData.Release_Date}
                id=""
                onChange={(e) => {
                  setAnimeDate(e.target.value);
                }}
              />

              <label htmlFor="">Tags</label>

              {/* Tags */}
              <textarea
                name="AnimeTags"
                placeholder="Tags"
                id=""
                defaultValue={AnimeData.Tags}
                cols="30"
                rows="10"
                onChange={(e) => {
                  setAnimeTags(e.target.value);
                }}
              ></textarea>

              <label htmlFor="">Trailer Video</label>
              <video
                src={
                  DyanamicTrailerLink != null
                    ? DyanamicTrailerLink
                    : `http://localhost:3002/uploads/Trailer/${AnimeData.Trailer_Link}`
                }
                controls
              ></video>
              <label htmlFor="videofile" className="videofile">
                Video Link
                <input
                  onChange={setTrailer}
                  type="file"
                  name="AnimeTrailerLink"
                  id="videofile"
                />
              </label>

              <label htmlFor="">Clip Video</label>
              <video
                src={
                  DyanamicClipLink != null
                    ? DyanamicClipLink
                    : `http://localhost:3002/uploads/Clips/${AnimeData.Clip}`
                }
                controls
              ></video>
              <label htmlFor="ClipLink" className="videofile">
                Video Link
                <input
                  onChange={setClip}
                  type="file"
                  name="AnimeClipLink"
                  id="ClipLink"
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
}

export default Card;
