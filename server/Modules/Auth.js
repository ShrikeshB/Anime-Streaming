const multer = require("multer");

const db = require("../DB");
const UpdateAuth = (UID, username, email, profileImg, callback) => {
  const query =
    "UPDATE auth SET Profile_Img=?, username = ?,email=? WHERE UID=?";
  db.query(query, [profileImg, username, email, UID], (err, res) => {
    if (err) console.log("err updating auth!");
    else {
      console.log("Auth updated!");
      callback(res);
    }
  });
};

const updatePassword = (UID, newPass, callBack) => {
  console.log("---------- updatePassword ------------");
  const query = "UPDATE auth SET Password=? WHERE UID=?";
  db.query(query, [newPass, UID], (err, res) => {
    if (err) console.log("error updating password");
    else callBack(res);
  });
};

const forgotPassword = (email, newPass, callBack) => {
  console.log("---------- forgot Password ------------");
  const query = "UPDATE auth SET Password=? WHERE email=?";
  db.query(query, [newPass, email], (err, res) => {
    if (err) console.log("error forgot password");
    else callBack(res);
  });
};

const updateMobile = (req, callBack) => {
  const mobile = req.body.mobile;
  const UID = req.body.UID;
  const query = "UPDATE auth SET Mobile=? WHERE UID=?";
  db.query(query, [mobile, UID], (err, res) => {
    if (err) console.log("error forgot password");
    else callBack(res);
  });
};
const UpdateEmail = (UID, email, callback) => {
  const query = "UPDATE auth SET email=? WHERE UID=?";
  db.query(query, [email, UID], (err, res) => {
    if (err) console.log("err updating auth!");
    else {
      console.log("Auth updated!");
      callback(res);
    }
  });
};

module.exports = {
  UpdateAuth,
  updatePassword,
  forgotPassword,
  updateMobile,
  UpdateEmail,
};
