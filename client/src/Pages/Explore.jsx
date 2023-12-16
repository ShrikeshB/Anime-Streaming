//! library
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
//! Media Links Here..
import VideoLinks from "../VideoLinks";
import ImgLinks from "../ImgLinks";
//! Style Here..
import ExploreStyle from "./Style/Explore/explore.css";
//! Components Here..
import Slider from "../Components/slider/Slider";
import Navigation from "../Components/nav/Navigation";
import Card from "../Components/Cards/Card";
import CWCard from "../Components/CWCard/Card";
import Banner from "../Components/Banner/Banner";
import Genre from "../Components/Genre/Genre";
import { useNavigate } from "react-router";
import Warning from "../Components/Warning/Warning";
import { Cookies, useCookies } from "react-cookie";
import Footer from "../Components/Footer/Footer";
function Explore() {
  const [cookies, setCookie] = useCookies(["user"]);
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

  const [ShounenCardData, setShounenCardData] = useState([]);
  const [OnGoingCardData, setOnGoingCardData] = useState([]);
  const [bannerData1, setBannerData1] = useState({});
  const [bannerData2, setBannerData2] = useState({});
  const win = window.sessionStorage;
  const GetCard = async () => {
    axios.get("http://localhost:3002/getCardData/Shounen").then((res) => {
      setShounenCardData(res.data);
    });

    axios.get("http://localhost:3002/getAnimeData").then((response) => {
      console.log(response);
      setBannerData1(response.data[0]);
      setBannerData2(response.data[1]);
    });

    axios.get("http://localhost:3002/getOnGoingAnimeData").then((response) => {
      console.log(response);
      setOnGoingCardData(response.data);
    });
  };

  const [CWData, setCWData] = useState([]);
  const [CWStyle, setCWStyle] = useState("none");
  console.log("UID=" + win.getItem("UID"));
  const GetCWData = () => {
    if (win.getItem("UID") != null) {
      axios
        .get(`http://localhost:3002/getContinueWatching/${win.getItem("UID")}`)
        .then((res) => {
          if (res.data == null || res.data == "") {
            console.log("no CW");
            setCWStyle("none"); // if the CW data not exits then element will be displayed none..
          } else {
            console.log(res.data);
            setCWData(res.data);
            setCWStyle("");
          }
        });
    }
  };

  // used to open the card..
  let navigate = useNavigate();
  const openCard = async (id, title) => {
    navigate(`/animeDesc/${id}/${title}`);
    // console.log(id);
  };

  //! used to insert/update Ep progress in database..
  const Insert_Ep_Progress = () => {
    if (
      win.getItem("EpProgress") > 0 &&
      win.getItem("EpProgress") != null &&
      win.getItem("CW_AID") != null
    ) {
      const data = {
        UID: win.getItem("UID"),
        AID: win.getItem("CW_AID"),
        EID: win.getItem("CW_EID"),
        Progress: win.getItem("EpProgress"),
      };
      console.log("progress in play=", win.getItem("EpProgress"));
      axios
        .post("http://localhost:3002/ep_Progress", data)
        .then((result) => {});

      console.log("progress updated..");
    } else {
      console.log("progress not updated..");
    }
  };

  const stayLogin = () => {
    if (cookies.UID != null) {
      console.log("cookie uid=", cookies.UID);
      win.setItem("UID", cookies.UID); //session
    } else {
      console.log("no cookie");
    }
  };

  useEffect(() => {
    // to fetch the data to display the cards...
    stayLogin();
    GetCard();
    GetCWData();
    Insert_Ep_Progress();
  }, []);

  return (
    <section className="Explore" style={ExploreStyle}>
      <Warning msg={"Your Plan is Expired!"} />
      <Navigation />
      <Slider data={ShounenCardData} />

      <div className="shadow"></div>

      <Start style={{ display: CWStyle }} Title="Continue Watching" />
      <div style={{ display: CWStyle }} className="card-container">
        {CWData.map((val, index) => {
          // console.log(val.Poster_Image);
          return (
            <div key={index}>
              <CWCard
                ENo={val.EpisodeNumber}
                EID={val.EID}
                SNo={val.SNo}
                AID={val.AID}
                ImgLink={val.Poster_Image}
                Title={val.Title}
                IMDB={val.IMDB_Rating}
              />

              <div className="redLine"></div>
            </div>
          );
        })}
      </div>

      <Start Title="On Going" />
      <div className="card-container">
        {OnGoingCardData.map((val, index) => {
          // console.log(val.Poster_Image);
          return (
            <div
              key={index}
              onClick={() => {
                openCard(val.AID, val.Title);
              }}
            >
              <Card
                ImgLink={val.Poster_Image}
                Title={val.Title}
                IMDB={val.IMDB_Rating}
              />
            </div>
          );
        })}
      </div>

      <End GenreName={"On Going"} />

      <Banner
        videoLink={bannerData1 != null ? bannerData1.Clip : ""}
        title={bannerData1 != null ? bannerData1.Title : ""}
        genre={bannerData1 != null ? bannerData1.Genre : ""}
        imdb={bannerData1 != null ? bannerData1.IMDB_Rating : ""}
        AID={bannerData1 != null ? bannerData1.AID : ""}
      />
      <Start Title="Shounen" />
      <div className="card-container">
        {ShounenCardData.length > 0
          ? ShounenCardData.map((val, index) => {
              // console.log(val.Poster_Image);
              return (
                <div
                  key={index}
                  onClick={() => {
                    openCard(val.AID, val.Title);
                  }}
                >
                  <Card
                    ImgLink={val.Poster_Image}
                    Title={val.Title}
                    IMDB={val.IMDB_Rating}
                  />
                </div>
              );
            })
          : ""}
      </div>
      <End GenreName={"Shounen"} />
      <Banner
        videoLink={bannerData2 != null ? bannerData2.Clip : ""}
        title={bannerData2 != null ? bannerData2.Title : ""}
        genre={bannerData2 != null ? bannerData2.Genre : ""}
        imdb={bannerData2 != null ? bannerData2.IMDB_Rating : ""}
        AID={bannerData2 != null ? bannerData2.AID : ""}
      />
      <h1 style={{ marginLeft: "4em", marginBottom: "4em" }}>Anime Genre</h1>
      <Genre />
      <Footer />
    </section>
  );
}

export default Explore;
