import React, { useEffect, useRef, useState } from "react";
import style from "./Style/Chats/Chats.css";
import ImgLinks from "../ImgLinks";

import BgImg from "../Resources/Assets/ChatBG.jpg";
import IconsLinks from "../IconLinks";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router";
const socket = io.connect("http://localhost:3002");
const Chats = () => {
  const win = window.sessionStorage;
  const UID = win.getItem("UID");
  const navigate = useNavigate();
  const Chat1 = (props) => {
    return (
      <div className="chat1">
        <div className="profile">
          <img
            className={props.profilePath != "none" ? "" : "noProfile"}
            src={
              props.profilePath != "none"
                ? `http://localhost:3002/uploads/profile/${props.profilePath}`
                : IconsLinks.user
            }
            alt=""
          />
        </div>
        <div className="content">
          <p>{props.chat}</p>
        </div>
      </div>
    );
  };

  const Chat2 = (props) => {
    return (
      <div className="chat2">
        <div className="content">
          <p>{props.chat}</p>
        </div>
        <div className="profile">
          <img
            className={props.profilePath != "none" ? "" : "noProfile"}
            src={
              props.profilePath != "none"
                ? `http://localhost:3002/uploads/profile/${props.profilePath}`
                : IconsLinks.user
            }
            alt=""
          />
        </div>
      </div>
    );
  };

  const [msg, setMsg] = useState();
  const [msgList, setMsgList] = useState([]);
  const sendMsg = async (e) => {
    e.preventDefault();

    var date = new Date();

    const data = {
      UID: UID,
      msg: msg,
      postDate: date,
    };
    axios
      .post(`http://localhost:3002/insertChat/${UID}`, data)
      .then((res) => {});

    await socket.emit("sending", data);
    setMsgList((list) => [...list, data]);
    scrollToBottom();
    navigate(0);
  };

  const endPoint = useRef(null);
  const chatBody = useRef(null);

  const scrollToBottom = () => {
    const n = chatBody.current?.scrollHeight;
    console.log(n);
    chatBody.current?.scrollTo({ top: n });
  };

  const [chatData1, setChatData1] = useState({});
  const [chatData2, setChatData2] = useState([]);
  const getAllChats = () => {
    if (UID == null) {
      navigate("/auth");
    }

    axios.get(`http://localhost:3002/getChats/${UID}`).then((res) => {
      console.log(res);
      setChatData1(res.data[0]);
      setChatData2(res.data);

      scrollToBottom();
    });
  };

  const [userData, setuserData] = useState({});
  const getUserData = () => {
    axios.get(`http://localhost:3002/getUserData/${UID}`).then((res) => {
      console.log(res.data[0]);
      setuserData(res.data[0]);
    });
  };

  useEffect(() => {
    socket.on("receive", (data) => {
      setMsgList((list) => [...list, data]);
      console.log(data);
      scrollToBottom();
      navigate(0)
    });
    getUserData();
  }, [socket]);

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <section style={style} className="chats">
      <div className="bg">
        <img src={BgImg} alt="" />
      </div>
      {/* <div className="left">
        <div className="logo">
          <h1 className="">ANIME</h1>
        </div>
      </div> */}
      <div className="right">
        <div className="top">
          <div className="container">
            <div className="profile">
              <div className="img-container">
                <img
                  className={userData.Profile_Img != "none" ? "" : "noProfile"}
                  src={
                    userData.Profile_Img != "none"
                      ? `http://localhost:3002/uploads/profile/${userData.Profile_Img}`
                      : IconsLinks.user
                  }
                  alt=""
                />
                <div className="point"></div>
              </div>
            </div>
            <div className="info">
              <h2>{userData.Username}</h2>
              <p>online</p>
            </div>
          </div>
        </div>

        <div className="chats-container" ref={chatBody}>
          {chatData2.map((val, index) => {
            if (val.UID != UID) {
              return <Chat1 profilePath={val.Profile_Img} chat={val.Chat} />;
            } else {
              return <Chat2 profilePath={val.Profile_Img} chat={val.Chat} />;
            }
          })}

          {msgList.map((val, index) => {
            if (val.UID != UID) {
              return <Chat1 profilePath={val.Profile_Img} chat={val.msg} />;
            } else {
              return <Chat2 profilePath={val.Profile_Img} chat={val.msg} />;
            }
          })}

          <div ref={endPoint}></div>
        </div>

        <div className="message">
          <form action="">
            <input
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              type="text"
              placeholder="Write your message.."
            />
            <button onClick={sendMsg}>
              <img src={IconsLinks.send} alt="" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chats;
