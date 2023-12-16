import { useState } from "react";
import IconsLinks from "../../IconLinks";
import style from "./style/Notify.css";

function Notify(props) {
  const [classList, setclassList] = useState("notify active");
  const close = ()=>{
    setclassList("notify");
  }

  return (
    <div className={classList} style={style}>
      <div className="overlay"></div>
      <div className="container">
        <h1>Notice</h1>
        <p>{props.message}</p>
        <div onClick={close} className="close-btn">
          <img src={IconsLinks.close} alt="" />
        </div>
      </div>
    </div> 
  );
}

export default Notify;
