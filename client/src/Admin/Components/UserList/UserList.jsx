import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function UserList() {
    const nav = useNavigate();
  const [data, setdata] = useState([]);
  const [planData, setplanData] = useState([]);
  const getUserData = (email) => {
    console.log(email);

    axios.get(`http://localhost:3002/userlist`).then((res) => {
      console.log(res.data);
      if (res.data != "" && res.data != null) {
        let users = parseInt(res.data[0].Users);
        // console.log(res.data[0].Users);
        // console.log("users=" + users);
        setdata(res.data);
      }
    });

    axios.get(`http://localhost:3002/planlist`).then((res) => {
      console.log(res.data);
      if (res.data != "" && res.data != null) {
        let users = parseInt(res.data[0].Users);
        console.log(res.data[0].Users);
        console.log("users=" + users);
        setplanData(res.data);
        console.log(res.data[0].Plan);
      }
    });
  };
  const DeleteUser = (UID) => {
    axios.get(`http://localhost:3002/deleteUser/${UID}`).then((res) => {
      console.log(res.data);
      nav(0)
    });

  };

  const style = {
    marginBottom: "1em",
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="UserList">
      <h1>User List</h1>
      <form action="">
        {planData.map((val, index) => {
          return (
            <div style={style} className="user">
              <h3>{val.Username}</h3>
              <p>{val.Email}</p>
              <p>{val.Plan}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  DeleteUser(val.UID);
                }}
                style={{ width: "60px", backgroundColor: "red" }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default UserList;
