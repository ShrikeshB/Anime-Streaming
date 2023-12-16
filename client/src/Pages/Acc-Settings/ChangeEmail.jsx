import React, { useState } from "react";
import IconsLinks from "../../IconLinks";
import axios from "axios";

function ChangeEmail(props, ref) {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [newEmail, setnewEmail] = useState();
  const [loginFormClass, setloginFormClass] = useState("loginForm");
  const [emailVerifyClass, setemailVerifyClass] = useState("email-verify-form");
  const login = (e) => {
    e.preventDefault();
    console.log(email);
    const data = {
      Login_Username: email,
      Login_Password: password,
    };
    axios.post("http://localhost:3002/Login", data).then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        axios
          .get(`http://localhost:3002/getBilling/${res.data[0].UID}`)
          .then((result) => {
            console.log(result);

            if (result.data != "" && result.data != null) {
              console.log(result.data);
              if (props.UID != result.data[0].UID) {
                alert("your no valid user!");
                return;
              }

              setloginFormClass("loginForm deactive");
              setemailVerifyClass("email-verify-form active");
            }
          });

        console.log("login success");
      } else {
        alert("login failed");
      }
    });
  };

  const updateEmail = (e) => {
    e.preventDefault();
    console.log(newEmail);
    const data = {
      email: newEmail,
    };
    axios
      .post(`http://localhost:3002/updateEmail/${props.UID}`, data)
      .then((res) => {
        if (res.data == "updated") alert("updated");
        else alert("error updating password");
      });
  };

  const close = () => {
    let cw = document.querySelector(".Change-Email");
    console.log(cw);
    cw.classList.remove("active");
  };
  return (
    <>
      <div ref={ref} className="Change-Email">
        <div className="container">
          <div onClick={close} className="close-btn">
            <img src={IconsLinks.close} alt="" />
          </div>
          <div className="login-form">
            <form onSubmit={login} className={loginFormClass} action="">
              <h1>LOGIN</h1>
              <p>For security please login again</p>
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                required
                type="password"
                placeholder="password"
                name=""
                id=""
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <button type="submit">Verify</button>
            </form>

            <form className={emailVerifyClass} action="" onSubmit={updateEmail}>
              <h1>New Email</h1>
              <input
                required
                onChange={(e) => {
                  setnewEmail(e.target.value);
                }}
                type="email"
                placeholder="Email"
                name=""
                id=""
              />
              <button>update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.forwardRef(ChangeEmail);
