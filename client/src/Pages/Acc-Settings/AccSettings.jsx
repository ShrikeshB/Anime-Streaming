import Navigation from "../../Components/nav/Navigation";
import style from "../Style/AccSettings/AccSettings.css";
import Images from "../../ImgLinks";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import IconsLinks from "../../IconLinks";
import ForgotPass from "./ForgotPass";
import ChangeEmail from "./ChangeEmail";
const AccSettings = () => {
  const win = window.sessionStorage;
  const nav = useNavigate();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [profileImg, setProfileImg] = useState(null);
  const [oldPath, setOldPath] = useState();
  const [dynamicImg, setdynamicImg] = useState();

  // get the user data from AUTH..
  const getUserData = () => {
    const UID = win.getItem("UID");
    if (UID != null) {
      axios.get(`http://localhost:3002/getUserData/${UID}`).then((res) => {
        console.log(res.data);
        setUserData(res.data[0]);
        setUsername(res.data[0].Username);
        setEmail(res.data[0].Email);
        setOldPath(res.data[0].Profile_Img);
        setdynamicImg(
          res.data[0].Profile_Img != "none"
            ? "http://localhost:3002/uploads/profile/" + res.data[0].Profile_Img
            : IconsLinks.user
        );
      });
    }
  };

  const setProfile = (e) => {
    setdynamicImg(URL.createObjectURL(e.target.files[0]));
    setProfileImg(e.target.files[0]);
  };

  // save/update the user data..
  const save = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("UID", win.getItem("UID"));
    formData.append("username", username);
    formData.append("email", email);
    formData.append("oldProfile", oldPath);
    formData.append("profile", profileImg);
    console.log(profileImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:3002/updateAuth", formData, config)
      .then((res) => {
        console.log(res);
        if (res != "") {
          alert("Saved!");
          nav(0);
        }
      });
  };

  const [flag, setFlag] = useState(null);
  win.setItem("fp", "open");
  let FP = useRef();
  let CE = useRef();
  const openForgotPass = () => {
    // if (win.getItem("fp") == "open") setFlag("active");
    // else setFlag("");

    // console.log(win.getItem("fp"));
    FP.current.className = "ForgotPass active";

    console.log(FP);
  };

  const openChangeEmail = () => {
    CE.current.className = "Change-Email active";

    console.log(CE);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div style={style} className="Acc-container">
        <Navigation />
        <div className="cover-img">
          <img src={Images.BG1} alt="" />
        </div>
        <div className="acc-sub-contain">
          <div className="sub-nav">
            <div className="profile-img">
              <img
                src={
                  userData.Profile_Img != "none"
                    ? `http://localhost:3002/uploads/profile/${userData.Profile_Img}`
                    : IconsLinks.user
                }
                style={
                  userData.Profile_Img == "none"
                    ? { width: "50%" }
                    : { width: "100%" }
                }
                alt=""
              />
            </div>
            <h1>Accout Settings</h1>

            <div className="nav-items">
              <ul>
                <li className="active">
                  <Link to="">User Info</Link>
                </li>
                <li>
                  <Link to="/BillingInfo">Billing Info</Link>
                </li>
                <li>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="UI-contain">
            <h1>User Info</h1>
            <form className="cust-Form">
              <label htmlFor="profile" className="profile-img">
                <img
                  src={dynamicImg}
                  style={
                    dynamicImg == IconsLinks.user
                      ? { width: "50%" }
                      : { width: "100%" }
                  }
                  alt=""
                />
                <input
                  onChange={setProfile}
                  name="profile"
                  type="file"
                  id="profile"
                />
                <p>Profile</p>
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <div className="input-div">
                <input type="email" placeholder="email" value={email} />
                <p style={{ cursor: "pointer" }} onClick={openChangeEmail}>
                  change Email
                </p>
              </div>
              <div className="input-div">
                <input
                  type="password"
                  placeholder="Password"
                  value={userData.Password}
                />
                <p style={{ cursor: "pointer" }} onClick={openForgotPass}>
                  change password
                </p>
              </div>

              <button onClick={save}>Save</button>
            </form>
          </div>
        </div>

        <ForgotPass ref={FP} class={flag} />
        <ChangeEmail ref={CE} class={flag} UID={win.getItem("UID")} />
      </div>
    </>
  );
};

export default AccSettings;
