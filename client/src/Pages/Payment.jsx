import React, { useEffect } from "react";

import { useState } from "react";

import ImgLinks from "../ImgLinks";
import axios from "axios";

import { useNavigate } from "react-router";
//! style link..
import style from "./Style/Payment/Payment.css";
import VideoLinks from "../VideoLinks";
import emailjs from "@emailjs/browser";

const loadRazorPay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};

const Payment = () => {
  const [userData, setUserData] = useState({});
  const nav = useNavigate();
  const win = window.sessionStorage;
  const [cardDate, setCardDate] = useState();
  const Pay = () => {
    const plan = win.getItem("plan");
    const UID = win.getItem("UID");
    if (plan == null || UID == null) {
      alert("something went wrong..");
      nav("/Auth");
    } else {
      // console.log(cardDate);
      let date = new Date(cardDate);
      let curDate = new Date();
      if (date > curDate) {
        const data = {
          plan: plan,
          UID: UID,
        };
        axios.post(`http://localhost:3002/Payment`, data).then((res) => {
          console.log(res);
          if (res.data != null && res.data != "") {
            alert("Enjoy ur favourite animes");
            sendEmail(plan,userData.Email);
            nav("/Explore");
          }
        });
      } else {
        alert("Card Expired!");
      }
    }
  };

  const [mobile, setmobile] = useState(null);

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
      setmobile(res.data[0].Mobile);
      console.log(res);
    });
  };



  const [text, setText] = useState({});
  const setTextData = () => {
    const plan = win.getItem("plan");

    if (plan == "Basic Plan") {
      setText({
        plan: plan,
        price: 200,
        users: 1,
      });
    } else if (plan == "Standard Plan") {
      setText({
        plan: plan,
        price: 400,
        users: 2,
      });
    } else if (plan == "Premium Plan") {
      setText({
        plan: plan,
        price: 1800,
        users: 5,
      });
    }
  };

  const sendEmail = (plan,email) => {
    const msg = "Payment successfull for " + plan;
    const data = {
      from_email: "animeott123@gmail.com",
      message: msg,
      // to_email: "shrikeshspark88@gmail.com",
      to_email: email,
      subject: "Payment compeleted",
    };

    emailjs
      .send("service_oht2128", "template_alet1pb", data, "xKvU80nRus2aQAhpb")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  const [data, setdata] = useState({});
  async function displayRazorPay(e) {
    e.preventDefault();
    const res = await loadRazorPay();

    if (!res) {
      alert("failed to load razor!!");
      return;
    }

    if (mobile == "" || mobile == null) {
      alert("enter mobile number please..");
      return;
    }
    const data = {
      mobile: mobile,
      UID: win.getItem("UID"),
    };
    axios.post("http://localhost:3002/updateMobile", data).then((res) => {});

    await axios.post("http://localhost:3002/razorPay").then((t) => {
      console.log(t);
      setdata(t.data);
    });
    let amt = Number(text.price);
    const options = {
      key: "rzp_test_K9TyacZ1arXQTM", // Enter the Key ID generated from the Dashboard
      amount: amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "AnimeOTT", //your business name
      description: "Test Transaction",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:3000/PaymentStatus",
      handler: (res) => {
        console.log(res);
        nav("/paymentstatus/" + res.razorpay_payment_id);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "1234567890", //Provide the customer's phone number for better conversion rates
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const test = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getUserData();
    setTextData();
  }, []);

  return (
    <>
      <div className="Auth-container" style={style}>
        <div className="cover-img">
          <video src={VideoLinks.sasukeLoop} muted loop autoPlay></video>
        </div>
        <div className="payment form-container">
          <div className="Payment-sub-contain">
            <div className="Bill-info">
              <h1>Billing Info</h1>
              <div className="container">
                <ul>
                  <li>
                    <p>Plan</p>
                  </li>

                  <li>
                    <p>Users</p>
                  </li>
                  <li>
                    <p>Quality</p>
                  </li>
                  <li>
                    <p>Amount</p>
                  </li>
                </ul>
                <ul>
                  <li>
                    <p>{text.plan}</p>
                  </li>

                  <li>
                    <p>{text.users}</p>
                  </li>
                  <li>
                    <p>High</p>
                  </li>
                  <li>
                    <p>₹{text.price}</p>
                  </li>
                </ul>
              </div>
              {/* 
              <button onClick={displayRazorPay} className="auth-btn">
                Pay
              </button> */}
            </div>
            <div className="payment-form Signup-form">
              <h1>Your Details</h1>
              <div className="container">
                <ul>
                  <li>
                    <p>Email</p>
                  </li>

                  <li>
                    <p>Mobile</p>
                  </li>
                </ul>
                <ul>
                  <li>
                    {/* <p>{userData.Email.lenght < 10 ? email : email.subStr(0, 10)}</p> */}
                    <p>{userData.Email}</p>
                  </li>

                  <li>
                    <p>{userData.Mobile}</p>
                  </li>
                </ul>
              </div>

              <form action="">
                {userData.Mobile == "0" ? (
                  <input
                    type="number"
                    pattern="[7-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      setmobile(e.target.value);
                    }}
                  />
                ) : (
                  ""
                )}
                <button onClick={displayRazorPay} className="auth-btn">
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
