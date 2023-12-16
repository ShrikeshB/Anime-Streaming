import React from "react";

import { useEffect, useState } from "react";
import IconsLinks from "../../IconLinks";
import style from "./style/Warning.css";
import axios from "axios";

const Warning = (props) => {
  const [warnClass, setClass] = useState("warning-container");
  const win = window.sessionStorage;
  const getBilling = () => {
    if (win.getItem("UID") == null) {
      win.setItem("Expired", 0);
      console.log("no uid");
    } else {
      axios
        .get(`http://localhost:3002/getBilling/${win.getItem("UID")}`)
        .then((res) => {
          console.log(res.data);
          if (res.data != "" && res.data != null) {
            console.log("Billing");
            const Expiry_date = new Date(res.data[0].Expiry_date);
            const curDate = new Date();
            console.log(Expiry_date);
            if (Expiry_date < curDate) {
              win.setItem("Expired", 1);
              console.log("expired");
              setClass("warning-container active");
            } else {
              win.setItem("Expired", 0);
              // close();
            }
          } else {
            close();
          }
        });
    }
  };

  const close = () => {
    setClass("warning-container close");
  };

  useEffect(() => {
    getBilling();
  }, []);

  return (
    <div>
      <div className={warnClass}>
        <div>
          <p>{props.msg}</p>
          <a href="/Plans">Renew Plan</a>
        </div>
        <span onClick={close}>
          <img src={IconsLinks.close} alt="" />
        </span>
      </div>
    </div>
  );
};

export default Warning;
