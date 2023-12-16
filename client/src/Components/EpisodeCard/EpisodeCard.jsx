import React  from 'react';

import IconsLinks from "../../IconLinks";

import style from "./style/EpisodeCard.css"
function EpisodeCard(props) {
    return ( 
        
        <div className={"EpisodeCard "+props.class} style={style}>
            <div className="left">
                <div className="icon-container">
                    <img src={ props.class=="active"?IconsLinks.EpisodePlayBtn2: IconsLinks.EpisodePlayBtn} alt="" />
                </div>
                <div className="content">
                    <p className="Ep">Episode {props.ENo}</p>
                    
                    <p>{(props.Ename < 8) ? (props.Ename) : (props.Ename.substr(0,6).concat(".."))}</p>
                </div>
            </div>
            <div className="right">
                <p>{props.Eduration}min</p>
                <p>{props.Lang}</p>
            </div>
        </div>

     );
}

export default EpisodeCard;