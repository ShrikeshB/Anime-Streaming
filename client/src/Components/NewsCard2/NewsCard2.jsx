import Images from "../../ImgLinks";
import style from "./style/NewsCard2.css";

function NewsCard2(props) {
  return (
    <a href={`http://localhost:3000/NewsDetails/${props.NID}`} className="NewsCard2" style={style}>
      <div className="img-container">
        <img
          src={`http://localhost:3002/uploads/News/${props.CoverImage}`}
          alt=""
        />
      </div>

      <div className="content">
        <h3>{props.Title}</h3>
        <p>
          {props.Desc.length < 20
            ? props.Desc
            : props.Desc.substr(1, 200).concat("...")}
        </p>
        <br />
        <p>{props.Date}</p>
      </div>
    </a>
  );
}

export default NewsCard2;
