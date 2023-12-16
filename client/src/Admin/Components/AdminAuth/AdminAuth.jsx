import { useState } from "react";
import style from "./style/AdminAuth.css";
import axios from "axios";
import { useNavigate } from "react-router";
function AdminAuth() {
  const [Login_Username, setLogin_Username] = useState(null);
  const [Login_Password, setLogin_Password] = useState(null);
  const nav = useNavigate();
  const win = window.sessionStorage;
  const Login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/AdminLogin", {
        Login_Username: Login_Username,
        Login_Password: Login_Password,
      })
      .then((res) => {
        if (res.data.length > 0) {
          win.setItem("AdminUID", res.data[0].UID);

          nav("/dashboard");
        } else {
          alert("login failed");
        }
      });
  };

  return (
    <>
      <div style={style} className="admin-auth">
        <div className="container">
          <form onSubmit={Login} className="Login-form Signup-form">
            <h1>LOGIN</h1>
            <input
              type="text"
              required
              name="Login_Username"
              id=""
              placeholder="Username"
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
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAuth;
