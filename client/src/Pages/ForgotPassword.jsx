import { useRef, useState } from "react";
import style from "./Style/ForgotPassword/ForgotPassword.css";
import emailjs from "@emailjs/browser";
import IconsLinks from "../IconLinks";
import axios from "axios";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const navigate = useNavigate();

  const [translate, setTranslate] = useState({
    transform: "translateX(0%)",
  });

  const codeInputField1 = useRef();
  const codeInputField2 = useRef();
  const codeInputField3 = useRef();
  const codeInputField4 = useRef();
  const [email, setEmail] = useState(null);
  const genratedCode = Math.floor(Math.random() * 9999) + 1111;

  const [spinnerFlag, setspinnerFlag] = useState(false);

  const sendCode = async (e) => {
    e.preventDefault();

    if (email == null) return;

    setTranslate({
      transform: "translateX(-100%)",
    });

    setspinnerFlag(!spinnerFlag);
    sendEmail("123", (res) => {
      console.log(res);
      setspinnerFlag(!spinnerFlag);

      setTranslate({
        transform: "translateX(-100%)",
      });
    });
  };

  const [Code, setCode] = useState("");
  const [isVerifed, setisVerifed] = useState(false);
  const verifyCode = (e) => {
    e.preventDefault();
    console.log(Code);
    if (Code == "1234") {
      setTranslate({
        transform: "translateX(-200%)",
      });
      setisVerifed(true);
    } else {
      alert("wrong code");
    }
  };

  const mergeInput = (value) => {
    setCode(Code + "" + value);
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

  const [newPassword, setnewPassword] = useState();
  const changePassword = (e) => {
    e.preventDefault();

    if (isVerifed == false) navigate("/ForgotPassword");

    const data = {
      email: email,
      newPassword: newPassword,
    };
    axios.post("http://localhost:3002/forgotPassword", data).then((res) => {
      console.log(res);
      if (res.data == "updated") {
        alert("updated!");
        navigate("/auth");
        setisVerifed(false);
      } else {
        alert("failed to update");
        setisVerifed(false);
      }
    });
  };

  const sendEmail = (code, cb) => {
    const msg = "Security code for forgot password :" + code;
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
          cb("success");
        },
        function (error) {
          console.log("FAILED...", error);
          cb("failed");
        }
      );
  };

  return (
    <>
      <div style={style} className="forgot-password">
        <div className="container">
          <div className="steps">
            <div style={translate} className="sub-container">
              <div className={spinnerFlag ? "spinner active" : "spinner"}>
                <img src={IconsLinks.loading2} alt="" />
              </div>
              {/* STEP-1 */}
              <form onSubmit={sendCode} className="step1" action="">
                <p>Forgot Password</p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  type="email"
                  placeholder="Email"
                />
                <button type="submit">send code</button>
                <div className="dots">
                  <div className="dot active"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </form>

              {/* STEP-2 */}
              <form onSubmit={verifyCode} className="step2" action="">
                <p>Enter Code</p>
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

                  <button type="submit">Verify</button>
                </div>

                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot active"></div>
                  <div className="dot"></div>
                </div>
              </form>

              {/* STEP-3 */}
              <form onSubmit={changePassword} className="step3" action="">
                <p>New Password</p>
                <input
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="New Password"
                />
                <button>Change</button>

                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot active"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
