import { useEffect, useState } from "react";
import IconsLinks from "../IconLinks";
import VideoLinks from "../VideoLinks";
import style from "./Style/PaymentStatus/PaymentStatus.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import emailjs from "@emailjs/browser";

function PaymentStatus() {
  const win = window.sessionStorage;
  const nav = useNavigate();
  const { response } = useParams();
  console.log(response);
  const [text, setText] = useState({});

  const setTextData = () => {
    const plan = win.getItem("plan");
    if (win.getItem("UID") == null) {
      nav("/Auth");
      return;
    } else if (win.getItem("Expired") == 1) {
      nav("/Plans");
      console.log("expired");
      return;
    } else if (win.getItem("paymentStatus") == "done") {
      return;
    }

    if (plan == "Basic Plan") {
      setText({
        plan: plan,
        price: 200,
      });
    } else if (plan == "Standard Plan") {
      setText({
        plan: plan,
        price: 400,
      });
    } else if (plan == "Premium Plan") {
      setText({
        plan: plan,
        price: 400,
      });
    }
  };

  const [userData, setUserData] = useState({});

  const getUserData = () => {
    win.setItem("paymentStatus", "ok");

    if (win.getItem("UID") == null) {
      nav("/Auth");
    } else if (win.getItem("Expired") == 1) {
      nav("/Plans");
      console.log("expired");
    }
    const UID = win.getItem("UID");

    axios.get(`http://localhost:3002/getUserData/${UID}`).then((res) => {
      setUserData(res.data[0]);
      console.log(res);
    });
  };
  const [spinnerFlag, setspinnerFlag] = useState(false);

  const Pay = () => {
    const plan = win.getItem("plan");
    const UID = win.getItem("UID");
    if (plan == null || UID == null) {
      alert("something went wrong..");
      nav("/Auth");
    } else {
      const data1 = {
        plan: plan,
        UID: UID,
        price: text.price,
      };
      axios.post(`http://localhost:3002/Payment`, data1).then((res) => {
        console.log(res);
        if (res.data != null && res.data != "") {
          alert("Enjoy ur favourite animes");
          win.setItem("paymentStatus", "done");
          setspinnerFlag(!spinnerFlag);

          sendEmail(plan, (res) => {
            if (res == "success") {
              setspinnerFlag(!spinnerFlag);
              nav("/Explore");
            } else {
              setspinnerFlag(!spinnerFlag);
            }
          });
        }
      });
    }
  };

  const sendEmail = (plan, callback) => {
    const msg = "Payment successfull for " + plan;
    const data = {
      from_email: "animeott123@gmail.com",
      message: msg,
      to_email: "shrikeshspark88@gmail.com",
      subject: "Payment compeleted",
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
    setTextData();
    getUserData();
  }, []);

  return (
    <>
      <div className="Auth-container PaymentStatus">
        <div className="cover-img">
          <video src={VideoLinks.sasukeLoop} muted loop autoPlay></video>
        </div>

        <div className="status-form">
          <div className="status">
            <div className="img-container">
              <img src={IconsLinks.success} alt="" />
            </div>
            <p>Payment Successful</p>
          </div>
          <div className={spinnerFlag ? "spinner active" : "spinner"}>
            <img src={IconsLinks.loading2} alt="" />
          </div>
          <div className="content">
            <div className="container">
              <div className="left">
                <p>Plan</p>
                <p>Mail</p>
                <p>Mobile</p>
                <p>Payment ID</p>
                <p style={{ fontWeight: "600" }}>Amount paid</p>
              </div>
              <div className="right">
                <p>{text.plan}</p>
                <p>{userData.Email}</p>
                <p>{userData.Mobile}</p>
                <p>{response}</p>
                <p style={{ fontWeight: "600" }}>₹{text.price}</p>
              </div>
            </div>
          </div>

          <button onClick={Pay}>Close</button>
        </div>
      </div>
    </>
  );
}

export default PaymentStatus;
