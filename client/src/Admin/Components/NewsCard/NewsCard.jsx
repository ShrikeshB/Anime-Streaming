import { useEffect, useState } from "react";
import imgLinks from "../../../ImgLinks";
import style from "./style/NewsCard.css";
import IconsLinks from "../../../IconLinks";
import axios from "axios";
import { useNavigate } from "react-router";
function NewsCard(props) {
  const [btnClass, setBtnClass] = useState("btns");
  const navigate = useNavigate();
  const [DyanamicCoverpage, setDyanamicCoverpage] = useState(
    "http://localhost:3002/uploads/News/" + props.imgPath
  );
  const setCoverPage = (e) => {
    e.preventDefault();
    setDyanamicCoverpage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };

  const openForm = (NID) => {
    navigate("/NewsEdit/" + NID);
  };

  const deleteNews = (NID) => {
    let promt = window.confirm("Are you sure you want to Delete ?");
    if (promt) {
      axios.post("http://localhost:3002/deleteNews/" + NID);
      navigate(0);
    }
  };
  return (
    <div
      onMouseOver={() => {
        setBtnClass("btns active");
      }}
      onMouseOut={() => {
        setBtnClass("btns");
      }}
      style={style}
      className="Ad-NewsCard"
    >
      <div className="card">
        <div className="NewsCard-container">
          <div className="img-container">
            <img
              src={"http://localhost:3002/uploads/News/" + props.imgPath}
              alt=""
            />
            <div className="overlay"></div>
          </div>
        </div>

        <div className="content">
          <h2>{props.Title}</h2>
          <p>{props.Timestamp}</p>
        </div>

        <div className={btnClass}>
          <button
            className="del-btn"
            onClick={() => {
              deleteNews(props.NID);
            }}
          >
            Delete
          </button>
          <button
            className="edit-btn"
            onClick={() => {
              openForm(props.NID);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
