import Images from "../../ImgLinks";
import style from "./style/NewsCard.css";
function NewsCard(props) {
  return (
    <a href={`http://localhost:3000/NewsDetails/${props.NID}`} className="NewsCard" style={style}>
      <div className="img-container">
        <img src={`http://localhost:3002/uploads/News/${props.CoverImage}`} alt="" />
      </div>
      <div className="content">
        <h1>{props.Title}</h1> 
        <br />
        <p className="desc">
          {props.Desc.length < 20
            ? props.Desc
            : props.Desc.substr(1, 200).concat("...")}
        </p>
        <br /><br /><br /><br /><br />
        <p style={{fontSize:'12px'}}>{props.Date}</p>
        <br />
      </div>
    </a>
  );
}

export default NewsCard;
