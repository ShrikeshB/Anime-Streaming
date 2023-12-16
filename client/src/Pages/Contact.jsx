import style from "./Style/Contact/Contact.css";
import bgImg from "../Resources/Images/MHA.jpg";
import Navigation from "../Components/nav/Navigation";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import IconsLinks from "../IconLinks";
import { useNavigate } from "react-router";
import axios from "axios";

function Contact() {
  const [msg, setmsg] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  const [spinnerFlag, setspinnerFlag] = useState(false);
  const win = window.sessionStorage;

  const [userData, setUserData] = useState({});

  const getUserData = () => {
    if (win.getItem("UID") == null) {
      navigate("/Auth");
    }
    const UID = win.getItem("UID");
    axios.get(`http://localhost:3002/getUserData/${UID}`).then((res) => {
      setUserData(res.data[0]);
      setemail(res.data[0].Email);
      console.log(res);
    });
  };

  //! on submit this function is called!
  const contact = (e) => {
    e.preventDefault();
    setspinnerFlag(true);
    
    sendEmail(msg, (res) => {
      if (res == "success") {
        setspinnerFlag(false);
        navigate(0);
      } else {
        setspinnerFlag(false);
      }
    });
  };

  //! sends the email to us.
  const sendEmail = (message, callback) => {
    const msg = message;
    const data = {
      // from_email: "shrikeshspark88@gmail.com",
      from_email: email, 
      message: msg,
      to_email: "animeott123@gmail.com",
      subject: "Queries of users",
    };

    emailjs
      .send("service_oht2128", "template_alet1pb", data, "xKvU80nRus2aQAhpb")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          callback("success");
        },
        function (error) {
          console.log("FAILED...", error);
          callback("failed");
        }
      );
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="contact-us" style={style}>
        {/* <Navigation /> */}
        <div className="container">
          <div className="left">
            <div className="bg"></div>
          </div>
          <div className="right">
            <h1>
              GET IN <span>TOUCH</span>
            </h1>
            <p>Have any quries?</p>

            <form onSubmit={contact} action="">
              <div className={spinnerFlag ? "spinner active" : "spinner"}>
                <img src={IconsLinks.loadingWhite} alt="" />
              </div>
              <input
                type="email"
                placeholder="email"
                required
                defaultValue={userData.Email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <textarea
                required
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="message.."
                onChange={(e) => {
                  setmsg(e.target.value);
                }}
              ></textarea>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
