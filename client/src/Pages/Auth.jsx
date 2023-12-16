import React, { useRef } from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import ImgLinks from "../ImgLinks";
import emailjs from "@emailjs/browser";

import { useNavigate } from "react-router";
//! style link..
import style from "./Style/Auth/Auth.css";
import VideoLinks from "../VideoLinks";
import { useCookies } from "react-cookie";
const Auth = () => {
  // Login Text...
  const [Login_Username, setLogin_Username] = useState(null);
  const [Login_Password, setLogin_Password] = useState(null);

  // Signup text
  const [Username, setUsername] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  const navigate = useNavigate();
  const win = window.sessionStorage;
  const [cookies, setCookie] = useCookies(["user"]);

  //! used to check coookie data for UID
  const stayLogin = () => {
    return new Promise((resolve) => {
      if (cookies.UID != null) {
        console.log("cookie uid=", cookies.UID);
        win.setItem("UID", cookies.UID); //session
        resolve(true);
      } else {
        console.log("no cookie");
        resolve(false);
      }
    });
  };

  const Login = async (e) => {
    e.preventDefault();
    const flag = await stayLogin();
    if (Login_Username == null) return;
    else if (Login_Password == null) return;

    // console.log(Login_Password.indexOf("@gmail.com"));

    if (Login_Username.indexOf("@gmail.com") <= -1) {
      if (Login_Username.length < 10) {
        alert("please enter correct email/mobile");
        return;
      }
    }

    console.log("user is already logged in = " + flag);
    var formData = new FormData();
    formData.append("Login_Username", Login_Username);
    formData.append("Login_Password", Login_Password);
    // const res = await axios.post("http://localhost:3002/Login", formData);

    //* flag checks whether the user have already signed in
    // if (!flag) {
    //   const c = await checkUserLoggedCount(Login_Username);
    //   console.log("logged=" + c);
    //   if (!c) return;
    // }

    axios
      .post("http://localhost:3002/Login", {
        Login_Username: Login_Username,
        Login_Password: Login_Password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          win.setItem("UID", res.data[0].UID);

          if (flag) {
            navigate("/explore");
            return;
          }

          axios
            .get(`http://localhost:3002/getBilling/${res.data[0].UID}`)
            .then((result) => {
              console.log(result);

              if (result.data != "" && result.data != null) {
                console.log(result.data);
                updateBilling(result.data[0].UID, result.data[0].Plan);

                if (!flag) {
                  updateBilling(result.data[0].UID, result.data[0].Plan);
                }
              }
            });
          navigate("/explore");

          console.log("login success");
        } else {
          console.log("failed");
          alert("login failed");
        }
      });
  };

  //! create a new cookie with UID
  const createCookie = (UID) => {
    var tomorrow = new Date();
    var today = new Date();
    tomorrow.setDate(today.getDate() + 10);
    setCookie("UID", UID, {
      path: "/",
      expires: tomorrow,
    });
  };

  const checkUserLoggedCount = (email) => {
    console.log(email);
    return new Promise((resolve) => {
      axios.get(`http://localhost:3002/getUsersLogged/${email}`).then((res) => {
        console.log(res.data);
        if (res.data != "" && res.data != null) {
          let users = parseInt(res.data[0].Users);
          console.log(res.data[0].Users);
          console.log("users=" + users);
          if (res.data[0].Plan === "Basic Plan" && users >= 1) {
            alert("No more users allowed to login!");
            resolve(false);
          } else if (res.data[0].Plan === "Standard Plan" && users >= 2) {
            alert("No more users allowed to login!");
            resolve(false);
          } else if (res.data[0].Plan === "Permium Plan" && users >= 5) {
            alert("No more users allowed to login!");
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  };

  //! used to Update the user count in billing...
  const updateBilling = (UID, Plan) => {
    axios.get(`http://localhost:3002/getBilling/${UID}`).then((res) => {
      if (res.data != "" && res.data != null) {
        let users = res.data[0].Users;
        if (Plan === "Basic Plan" && users < 1) {
          users++;
          axios.post(`http://localhost:3002/updatePayment/${UID}/${users}`);
          createCookie(UID);
          navigate("/Explore");
        } else if (Plan === "Standard Plan" && users < 2) {
          users++;
          axios.post(`http://localhost:3002/updatePayment/${UID}/${users}`);
          createCookie(UID);
          navigate("/Explore");
        } else if (Plan === "Permium Plan" && users < 5) {
          users++;
          axios.post(`http://localhost:3002/updatePayment/${UID}/${users}`);
          createCookie(UID);
          navigate("/Explore");
        } else {
          alert("No more users allowed to login!");
          return;
        }

        console.log("users=", users);
      }
    });
  };

  const [switchForms, setswitchForms] = useState("sub-container");
  const switchForm = (formName) => {
    if (formName === "SignUp") {
      // open signup form..
      setswitchForms("sub-container");
    } else {
      // open login form..
      // setswitchForms("sub-container")
      setswitchForms("sub-container active");
    }
  };

  const [LastID, setLastID] = useState(0);
  const Signup = async (e) => {
    e.preventDefault();

    const data = {
      Username: Username,
      Email: Email,
      Password: Password,
    };

    axios.post("http://localhost:3002/checkForSameUser", data).then((res) => {
      console.log(res);

      if (res.data == "same user") {
        alert("Email already !!");
        return;
      } else {
        console.log("in");
        const code = Math.floor(1000 + Math.random() * 9000);
        console.log(Email);
        sendEmail(code, Email);
        // send otp code
        const userCode = window.prompt("enter code");
        if (code == userCode) {
          console.log("correct code");
          axios.post("http://localhost:3002/Signup", data).then(async (res) => {
            console.log(res);
            if (res.data == "same user") alert("Email already");
            else {
              await getLastUserUid();
            }
          });
        } else {
          console.log("wrong");
        }
      }
    });
  };

  const getLastUserUid = () => {
    axios.get("http://localhost:3002/getLastUser").then((res) => {
      console.log(res.data[0].UID);
      setLastID(res.data[0].UID);

      win.setItem("UID", res.data[0].UID);
      navigate("/Explore");
    });
  };

  const psw = useRef();
  const PatternMessage = useRef();
  const letter = useRef();
  const capital = useRef();
  const number = useRef();
  const length = useRef();

  // When the user clicks on the password field, show the message box
  const OnFocus = () => {
    // document.querySelector("Pattern-Message").style.display = "block";
    PatternMessage.current.style.display = "block";
  };

  // When the user clicks outside of the password field, hide the message box
  const OnBlur = () => {
    // document.querySelector("Pattern-Message").style.display = "none";
    PatternMessage.current.style.display = "none";
  };

  // When the user starts to type something inside the password field
  const OnKeyUp = () => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (psw.current.value.match(lowerCaseLetters)) {
      letter.current.classList.remove("invalid");
      letter.current.classList.add("valid");
    } else {
      letter.current.classList.remove("valid");
      letter.current.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (psw.current.value.match(upperCaseLetters)) {
      capital.current.classList.remove("invalid");
      capital.current.classList.add("valid");
    } else {
      capital.current.classList.remove("valid");
      capital.current.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (psw.current.value.match(numbers)) {
      number.current.classList.remove("invalid");
      number.current.classList.add("valid");
    } else {
      number.current.classList.remove("valid");
      number.current.classList.add("invalid");
    }

    // Validate length
    if (psw.current.value.length >= 8) {
      length.current.classList.remove("invalid");
      length.current.classList.add("valid");
    } else {
      length.current.classList.remove("valid");
      length.current.classList.add("invalid");
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

  // useEffect(() => {
  //   getLastUserUid();
  // }, []);

  return (
    <>
      <div className="Auth-container" style={style}>
        <div className="cover-img">
          <video src={VideoLinks.narutoLoop} muted loop autoPlay></video>
        </div>

        <div ref={PatternMessage} class="Pattern-Message">
          <h3>Password must contain the following:</h3>
          <p ref={letter} class="invalid">
            A <b>lowercase</b> letter
          </p>
          <p ref={capital} class="invalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p ref={number} class="invalid">
            A <b>number</b>
          </p>
          <p ref={length} class="invalid">
            Minimum <b>8 characters</b>
          </p>
        </div>

        <div className="form-container">
          <div className={switchForms}>
            <form onSubmit={Signup} className="Signup-form ">
              <h1>SIGN UP</h1>
              <input
                type="text"
                name="username"
                required
                id=""
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="email"
                required
                name="email"
                id=""
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                required
                name="password"
                id="psw"
                ref={psw}
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={OnFocus}
                onBlur={OnBlur}
                onKeyUp={OnKeyUp}
              />
              <button className="auth-btn" type="submit">
                SIGN UP
              </button>
              <p
                onClick={() => {
                  switchForm("Login");
                }}
              >
                Already Have An Account?
              </p>
            </form>

            <form onSubmit={Login} className="Login-form Signup-form">
              <h1>LOGIN</h1>
              <input
                type="text"
                required
                name="Login_Username"
                id=""
                placeholder="Mobile / Email"
                onChange={(e) => {
                  setLogin_Username(e.target.value);
                }}
              />
              <input
                type="password"
                required
                name="Login_Password"
                id=""
                placeholder="Password"
                onChange={(e) => {
                  setLogin_Password(e.target.value);
                }}
              />
              <button type="submit" className="auth-btn">
                LOGIN
              </button>
              <p
                onClick={() => {
                  switchForm("SignUp");
                }}
              >
                Don't Have Account?
              </p>
              <a className="fp" href="/ForgotPassword">
                forgot password
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
