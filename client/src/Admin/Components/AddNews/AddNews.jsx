import React, { useEffect, useState } from "react";
import style from "./style/AddNews.css";
import IconsLinks from "../../../IconLinks";
import axios from "axios";
import { useNavigate } from "react-router";
const AddNews = () => {
  const [dynamicImg, setDynamicImg] = useState(null);
  const [coverpage, setcoverpage] = useState(null);
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const [tags, settags] = useState();
  const [genre, setgenre] = useState("Shounen");
  const navigate = useNavigate();

  const setDyImg = (e) => {
    setDynamicImg(URL.createObjectURL(e.target.files[0]));
    setcoverpage(e.target.files[0]);
  };

  const submitData = (e) => {
    e.preventDefault();
    const date = new Date();
    if (coverpage == null) {
      alert("select cover page");
      return;
    }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("genre", genre);
    formData.append("newsCoverPage", coverpage);
    formData.append("TimeStamp", date.toLocaleString());
    console.log(coverpage);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:3002/addNews", formData, config)
      .then((res) => {
        if (res.data.affectedRows == 1) {
          // console.log("News uploaded");
          alert("News uploaded");
          navigate(0);
        } else {
          alert("Failed to upload News");
          console.log("Failed to upload News");
        }
      });
  };

  const nav = useNavigate();
  const win = window.sessionStorage;
  const checkForLogin = () => {
    if (win.getItem("AdminUID") == null) {
      nav("/AdminAuth");
    }
  };

  useEffect(() => {
    checkForLogin();
  }, []);

  return (
    <div className="AddNews admin" style={style}>
      <div className="banner">
        <h1 className="logo">ANIME</h1>
        <ul>
          <li>
            <a style={{ opacity: "40%" }} href="http://localhost:3000/addAnime">
              Dashboard/
            </a>
          </li>
          <li>
            <a href="">Add News</a>
          </li>
        </ul>

        <h1>Add News</h1>
      </div>

      <form onSubmit={submitData} action="">
        <label htmlFor="newsCoverPage">
          <div className="img-container">
            <img
              style={
                dynamicImg != null
                  ? {
                      width: "100%",
                    }
                  : {
                      width: "10%",
                    }
              }
              src={dynamicImg != null ? dynamicImg : IconsLinks.addImg}
              alt=""
            />
          </div>
          <input
            accept="image/*"
            name="newsCoverPage"
            id="newsCoverPage"
            onChange={setDyImg}
            type="file"
          />
          Select Poster
        </label>
        <input
          required
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
        />
        <textarea
          required
          name=""
          placeholder="Description"
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        ></textarea>

        <select
          required
          onChange={(e) => {
            setgenre(e.target.value);
          }}
          name=""
          id=""
        >
          <option value="Shounen">Shounen</option>
          <option value="Seinen">Seinen</option>
          <option value="Shoujo">Shoujo</option>
          <option value="Isekai">Isekai</option>
          <option value="Slice of life">Slice of life</option>Seinen
        </select>
        <textarea
          name=""
          required
          placeholder="Tags"
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            settags(e.target.value);
          }}
        ></textarea>

        <button type="submit">Add News</button>
      </form>
    </div>
  );
};

export default AddNews;
