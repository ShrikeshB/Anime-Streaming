import React, { useEffect, useState } from "react";

import style from "./Style/Plans/Plans.css";
import { useNavigate } from "react-router";
import axios from "axios";
import Notify from "../Components/notification/Notify";
function Plans() {
  const win = window.sessionStorage;
  const nav = useNavigate();
  const PlanSelection = (plan) => {
    win.setItem("plan", plan);
    nav("/Payment");
  };

  const [flag, setFlag] = useState(false);
  const checkForExistingPlan = async () => {
    const UID = win.getItem("UID");
    if (UID != null) {
      axios.get(`http://localhost:3002/getBilling/${UID}`).then((res) => {
        console.log(res);
        const curData = new Date();
        const expiryDate = new Date(res.data[0].Expiry_date);
        if (expiryDate > curData) {
          // if not expired!
          setFlag(true);
        }
      });
    }
    console.log(flag);
  };
  useEffect(() => {
    checkForExistingPlan();
  }, []);

  return (
    <section style={style} className="plan-section">
      {flag ? <Notify message={"Plan already exists" }/> : ""}

      <div className="plan-container">
        <div className="basic plan-card">
          <div className="title">
            <p>Basic Plan {flag}</p>
          </div>
          <div className="content">
            <h1>30 Days</h1>
            <ul>
              <li>Access All Anime</li>
              <li>Stream in high Quality</li>
              <li>No Downloads</li>
              <li>Access on All Devices</li>
              <li>1 User</li>
            </ul>
            <h1 className="price">₹200</h1>
            <button
              onClick={() => {
                PlanSelection("Basic Plan");
              }}
            >
              Buy
            </button>
          </div>
        </div>

        <div className="basic plan-card">
          <div className="title">
            <p>Standard Plan</p>
          </div>
          <div className="content">
            <h1>90 Days</h1>
            <ul>
              <li>Access All Anime</li>
              <li>Stream in high Quality</li>
              <li>No Downloads</li>
              <li>Access on All Devices</li>
              <li>2 User</li>
            </ul>
            <h1 className="price">₹499</h1>
            <button
              onClick={() => {
                PlanSelection("Standard Plan");
              }}
            >
              Buy
            </button>
          </div>
        </div>

        <div className="basic plan-card">
          <div className="title">
            <p>Premium Plan</p>
          </div>
          <div className="content">
            <h1>365 Days</h1>
            <ul>
              <li>Access All Anime</li>
              <li>Stream in high Quality</li>
              <li>No Downloads</li>
              <li>Access on All Devices</li>
              <li>5 User</li>
            </ul>
            <h1 className="price">₹1800</h1>
            <button
              onClick={() => {
                PlanSelection("Premium Plan");
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plans;
