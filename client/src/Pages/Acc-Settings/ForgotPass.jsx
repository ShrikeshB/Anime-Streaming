import IconsLinks from "../../IconLinks";
import emailjs from "@emailjs/browser";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
const ForgotPass = (props, ref) => {
  const win = window.sessionStorage;
  const UID = win.getItem("UID");
  const [Email, setEmail] = useState(null);
  const codeInputField1 = useRef();
  const codeInputField2 = useRef();
  const codeInputField3 = useRef();
  const codeInputField4 = useRef();
  const emailRef = useRef();
  const sendCode = () => {
    if (Email != null) {
      const code = Math.floor(Math.random() * 9999) + 1111;
      win.setItem("Code", code);
      console.log(code);
      sendEmail(code, Email);
      changeStep(2);
    } else {
      emailRef.current.setCustomValidity("email");
      console.log(emailRef);
    }
  };

  const [newPass, setNewPass] = useState();
  const savePassword = (e) => {
    e.preventDefault();
    const data = {
      newPass: newPass,
    };
    axios
      .post(`http://localhost:3002/updatePassword/${UID}`, data)
      .then((res) => {
        if (res.data == "updated") alert("updated");
        else alert("error updating password");
      });
  };

  const [Code, setCode] = useState("");
  const mergeInput = (value) => {
    setCode(Code + "" + value);
  };
  const verifyCode = () => {
    const code = win.getItem("Code");
    console.log(Code);
    if (code == Code) {
      alert("done");
      changeStep(3);
    } else {
      alert("Wrong Code!");
      setCode("");
      codeInputField1.current.value = "";
      codeInputField2.current.value = "";
      codeInputField3.current.value = "";
      codeInputField4.current.value = "";
    }
  };
  const [stepStyle, setStepStyle] = useState({});
  const changeStep = (step) => {
    switch (step) {
      case 1:
        setStepStyle({
          transform: "translateX(0%)",
        });
        break;
      case 2:
        setStepStyle({
          transform: "translateX(-33%)",
        });
        break;
      case 3:
        setStepStyle({
          transform: "translateX(-67%)",
        });
        break;
    }
  };

  const sendEmail = (Code, email) => {
    const msg = "Security Code : " + Code;
    const data = {
      from_email: "animeott123@gmail.com",
      message: msg,
      // to_email: "shrikeshspark88@gmail.com",
      to_email: email,
      subject: "Security Code AnimeOTT",
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

  //! used to shift the cursor pos to next in code..
  const shiftCursor = (nextPos) => {
    console.log(codeInputField1.current);
    if (nextPos == 2) {
      if (
        codeInputField1.current.textLength >= codeInputField1.current.maxLength
      ) {
        codeInputField2.current.focus();
      }
    } else if (nextPos == 3) {
      if (
        codeInputField2.current.textLength >= codeInputField2.current.maxLength
      ) {
        codeInputField3.current.focus();
      }
    } else if (nextPos == 4) {
      if (
        codeInputField3.current.textLength >= codeInputField3.current.maxLength
      ) {
        codeInputField4.current.focus();
      }
    }
  };

  const [classStatus, setClassStatus] = useState(props.class);
  // const overlay = useRef();
  const fp = useRef();

  const close = () => {
    let fp = document.querySelector(".ForgotPass");
    console.log(fp);
    changeStep(1);
    fp.classList.remove("active");
  };

  return (
    <div ref={ref} className="ForgotPass">
      <div className={"overlay-blur " + props.class}></div>
      <div className={"forgot-pass-contain " + props.class}>
        <div className="forgot-pass">
          <div onClick={close} className="close-btn">
            <img src={IconsLinks.close} alt="" />
          </div>
          <div style={stepStyle} className="steps">
            <div className="step step1">
              <h1>Forgot Password</h1>
              <div className="cust-Form">
                <input
                  required
                  type="text"
                  placeholder="Email"
                  ref={emailRef}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button onClick={sendCode}>Continue</button>
              </div>
            </div>
            <div className="step step2">
              <h1>Enter The Code</h1>
              <p>Code from your email</p>
              <div className="cust-Form">
                <div className="input-fields">
                  <input
                    type="text"
                    placeholder="X"
                    size={1}
                    maxLength={1}
                    ref={codeInputField1}
                    onChange={(e) => {
                      mergeInput(e.target.value);
                      shiftCursor(2);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="X"
                    size={1}
                    maxLength={1}
                    ref={codeInputField2}
                    onChange={(e) => {
                      mergeInput(e.target.value);
                      shiftCursor(3);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="X"
                    size={1}
                    maxLength={1}
                    ref={codeInputField3}
                    onChange={(e) => {
                      mergeInput(e.target.value);
                      shiftCursor(4);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="X"
                    size={1}
                    maxLength={1}
                    ref={codeInputField4}
                    onChange={(e) => {
                      mergeInput(e.target.value);
                    }}
                  />
                </div>

                <button onClick={verifyCode}>Continue</button>
              </div>
            </div>
            <div className="step step3">
              <h1>New Password</h1>
              <div className="cust-Form">
                <form action="">
                  <input
                    type="text"
                    placeholder="New Password"
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                  />
                  <button onClick={savePassword}>Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(ForgotPass);
