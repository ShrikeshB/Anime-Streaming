import Navigation from "../../Components/nav/Navigation";
import style from "../Style/AccSettings/AccSettings.css";
import Images from "../../ImgLinks";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const BillingInfo = () => {
  const win = window.sessionStorage;
  const nav = useNavigate();
  const [userData, setUserData] = useState({});
  const [billData, setbillData] = useState({});
  const [price, setprice] = useState();
  // get the user data from AUTH..
  const getUserData = () => {
    const UID = win.getItem("UID");
    if (UID != null) {
      axios.get(`http://localhost:3002/getUserData/${UID}`).then((res) => {
        console.log(res.data);
        setUserData(res.data[0]);
      });

      axios.get(`http://localhost:3002/getBilling/${UID}`).then((res1) => {
        console.log(res1.data);
        setbillData(res1.data[0]);
        if (res1.data[0].Plan == "Standard Plan") setprice("₹499");
        else if (res1.data[0].Plan == "Basic Plan") setprice("₹200");
        else setprice("₹1800");
      });
    }
  };

  const cancelPlan = () => {
    const UID = win.getItem("UID");
    let promt = window.confirm("Are you sure you want to cancel?");
    console.log(promt);
    if (promt) {
      axios.post(`http://localhost:3002/cancelPlan/${UID}`).then((res) => {});
      nav(0);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div style={style} className="Acc-container billingInfo">
        <Navigation />
        <div className="cover-img">
          <img src={Images.BG1} alt="" />
        </div>
        <div className="acc-sub-contain">
          <div className="sub-nav">
            <div className="profile-img">
              <img
                src={`http://localhost:3002/uploads/profile/${userData.Profile_Img}`}
                alt=""
              />
            </div>
            <div className="nav-items">
              <ul>
                <li>
                  <Link to="/AccountSettings">User Info</Link>
                </li>
                <li className="active">
                  <Link to="/BillingInfo">Billing Info</Link>
                </li>
                <li>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="UI-contain">
            <h1>Billing Info</h1>
            {billData != null ? (
              <div className="billing-card">
                <div className="title">
                  <h2>{billData.Plan}</h2>
                </div>
                <div className="content">
                  <h1>Expiring On</h1>
                  <p>{billData.Expiry_date}</p>
                  <p>Users Logged : {billData.Users}</p>
                  <p>Purchased on : {billData.Payment_date}</p>
                  <h2>{price}</h2>
                </div>
                <button onClick={cancelPlan} className="cancel-btn">
                  Cancel Plan
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
