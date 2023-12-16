import { useEffect, useState } from "react";
import IconsLinks from "../../../IconLinks";
import style from "./style/NewsEdit.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function NewsEdit() {
  const [DyanamicCoverpage, setDyanamicCoverpage] = useState(null);
  const [Title, setTitle] = useState(null);
  const [Desc, setDesc] = useState(null);
  const [TimeStamp, setTimeStamp] = useState(null);
  const [Tags, setTags] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const navigate = useNavigate();
  const { NID } = useParams();
  const [newsData, setnewsData] = useState([{}]);
  const getNewsData = () => {
    console.log(NID);
    axios.get("http://localhost:3002/getNewsByNID/" + NID).then((res) => {
      console.log(res);
      setnewsData(res.data[0]);

      setDyanamicCoverpage(
        "http://localhost:3002/uploads/News/" + res.data[0].Image
      );
    });
  };

  const setCoverPage = (e) => {
    e.preventDefault();
    setDyanamicCoverpage(URL.createObjectURL(e.target.files[0]));
    setCoverImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("Title", Title);
    formData.append("Desc", Desc);
    formData.append("TimeStamp", TimeStamp);
    formData.append("Tags", Tags);
    formData.append("coverImg", coverImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    let promt = window.confirm("Are you sure you want to save changes ?");
    if (promt) {
      axios
        .post(`http://localhost:3002/updateNews/${NID}`, formData, config)
        .then(() => {
          navigate(0);
        });
    }
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
    getNewsData();
  }, []);

  return (
    <div className="NewsEdit admin" style={style}>
      <div className="banner">
        <h1 className="logo">ANIME</h1>
        <ul>
          <li>
            <a style={{ opacity: "40%" }} href="http://localhost:3000/addAnime">
              Dashboard/
            </a>
          </li>
          <li>
            <a href="">Edit News</a>
          </li>
        </ul>

        <h1>Edit News</h1>
      </div>
      <div className={"newsForm"}>
        <form>
          <label htmlFor="coverImg" className="coverImg">
            <div className="img-container">
              <div className="overlay-edit">
                <img src={IconsLinks.edit} alt="" />
                <p>Cover Img</p>
              </div>
              <img src={DyanamicCoverpage} alt="" />
            </div>
            <input
              name="coverImg"
              onChange={setCoverPage}
              type="file"
              id="coverImg"
            />
          </label>
          <p>Title</p>
          <input
            defaultValue={newsData.Title}
            type="text"
            placeholder="Title"
            name="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <p>Description</p>

          <textarea
            defaultValue={newsData.Description}
            id=""
            cols="30"
            rows="10"
            name="Desc"
            placeholder="Desc"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>

          <p>TimeStamp</p>

          <input
            defaultValue={newsData.Timestamp}
            type="date"
            placeholder="timestamp"
            name="TimeStamp"
            onChange={(e) => {
              setTimeStamp(e.target.value);
            }}
          />

          <p>Tags</p>

          <textarea
            defaultValue={newsData.Tags}
            id=""
            cols="30"
            rows="10"
            placeholder="Tags"
            name="Tags"
            onChange={(e) => {
              setTags(e.target.value);
            }}
          ></textarea>
          <button onClick={saveChanges}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default NewsEdit;
