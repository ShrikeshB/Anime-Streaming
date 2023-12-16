import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../Components/Cards/Card";
import style from "./style/AL.css";
function ListAnimeCat() {
  const [shounen, setshounen] = useState([]);
  const [seinen, setseinen] = useState([]);
  const [isekai, setisekai] = useState([]);
  const [shoujo, setshoujo] = useState([]);
  const [sliceOfLife, setsliceOfLife] = useState([]);
  const getData = () => {
    axios.get("http://localhost:3002/getCardData/Shounen").then((res) => {
      setshounen(res.data);
    });

    axios.get("http://localhost:3002/getCardData/Seinen").then((res) => {
      setseinen(res.data);
      console.log(res.data);

    });

    axios.get("http://localhost:3002/getCardData/Isekai").then((res) => {
      setisekai(res.data);
    });

    axios.get("http://localhost:3002/getCardData/Shoujo").then((res) => {
      setshoujo(res.data);
    });

    axios.get("http://localhost:3002/getCardData/Slice of life").then((res) => {
      setsliceOfLife(res.data);
    });
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={style} className="AnimeListCat">
      <h1>Anime List as per genre</h1>

      <h3>Shounen</h3>
      <div  className="shounen">
        {shounen.map((val, index) => {
          return (
            <Card
              ImgLink={val.Poster_Image}
              Title={val.Title}
              IMDB={val.IMDB_Rating}
            />
          );
        })}
      </div>
<hr />
<br />
      <h3>Seinen</h3>
      <div className="shounen">
        {seinen.map((val, index) => {
          return (
            <Card
              ImgLink={val.Poster_Image}
              Title={val.Title}
              IMDB={val.IMDB_Rating}
            />
          );
        })}
      </div>
      <hr />
<br />
      
      <h3>Isekai</h3>
      <div className="shounen">
        {isekai.map((val, index) => {
          return (
            <Card
              ImgLink={val.Poster_Image}
              Title={val.Title}
              IMDB={val.IMDB_Rating}
            />
          );
        })}
      </div>

      <hr />
<br />
      <h3>Shoujo</h3>
      <div className="shounen">
        {shoujo.map((val, index) => {
          return (
            <Card
              ImgLink={val.Poster_Image}
              Title={val.Title}
              IMDB={val.IMDB_Rating}
            />
          );
        })}
        
        </div>
        <hr />
        <br />
      <h3>slice of life</h3>
      <div className="shounen">
        {sliceOfLife.map((val, index) => {
          return (
            <Card
              ImgLink={val.Poster_Image}
              Title={val.Title}
              IMDB={val.IMDB_Rating}
            />
          );
        })}
      </div>
      </div>
  );
}

export default ListAnimeCat;
