const db = require("../DB");
let flag = false;

const insertData = (UID, plan, curDate, Expiry_date, price) => {
  const data = {
    BID: "",
    UID: UID,
    Plan: plan,
    Payment_date: curDate,
    Price: price,
    Expiry_date: Expiry_date,
    Users: 1,
  };
  const query = "INSERT INTO BILLING SET ?";
  let a = "err";
  db.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("payment done..");
    }
  });
  return "done";
};

const Payment = (UID, plan, price) => {
  var today = new Date();
  if (plan == "Basic Plan") {
    var priorDate = new Date(new Date().setDate(today.getDate() + 30));
    // incrementing getMonth() is bz it start from 0=jan - 11=dec array...
    var curDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var ExpiryDate =
      priorDate.getFullYear() +
      "-" +
      (priorDate.getMonth() + 1) +
      "-" +
      priorDate.getDate();

    insertData(UID, plan, curDate, ExpiryDate, price);
  } else if (plan == "Standard Plan") {
    var priorDate = new Date(new Date().setDate(today.getDate() + 90));
    // incrementing getMonth() is bz it start from 0=jan - 11=dec array...
    var curDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var ExpiryDate =
      priorDate.getFullYear() +
      "-" +
      (priorDate.getMonth() + 1) +
      "-" +
      priorDate.getDate();

    insertData(UID, plan, curDate, ExpiryDate, price);
  } else {
    var priorDate = new Date(new Date().setDate(today.getDate() + 365));
    // incrementing getMonth() is bz it start from 0=jan - 11=dec array...
    var curDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var ExpiryDate =
      priorDate.getFullYear() +
      "-" +
      (priorDate.getMonth() + 1) +
      "-" +
      priorDate.getDate();

    insertData(UID, plan, curDate, ExpiryDate, price);
  }
  return "done";
};

const UpdatePayment = (UID, users) => {
  const query = "UPDATE billing SET Users=? WHERE UID=?";
  console.log("users=", UID);
  db.query(query, [users, UID], (err, res) => {
    if (err) {
      console.log("err in updating user in billing!");
      return null;
    } else {
      return "Payment done";
    }
  });
};

const cancelPlan = (UID, callback) => {
  const query = "DELETE FROM billing WHERE UID=?";
  db.query(query, [UID], (err, res) => {
    if (err) console.log(err);
    else {
      console.log("PLAN CANCELED");
      callback(res);
    }
  });
};

//! to get the no.of users logged in with same account..
const getUsersLogged = (req, cb) => {
  const email = req.params.email;

  console.log(email);
  // const query ="SELECT * FROM billing b INNER JOIN auth a ON b.UID=a.UID WHERE a.Email=? OR a.Mobile=?";

  // if (parseInt(email) != NaN) {
  //   console.log(parseInt(email));
  // }
  // if (Number.isInteger(email)) {
  //   console.log("------------ mobile");
  // }

  const query =
    "SELECT * FROM billing b , auth a   WHERE (a.Email=? ) AND (b.UID=a.UID)";
  db.query(query, [email, email], (err, result) => {
    console.log(result);
    cb(result);
  });

  // const query1 = "SELECT * FROM auth where email=?";
  // db.query(query1, [email], (err, result1) => {
  //   console.log(result1[0].UID);
  //   const query2 = "SELECT * FROM billing WHERE UID=?";
  //   db.query(query2, [result1[0].UID], (err, result2) => {
  //     console.log(result2);
  //     cb(result2);
  //   });
  // });
};

const getUserList = (cb) => {
  // const query = "SELECT * FROM billing b , auth a  AND (b.UID=a.UID)";
  const query = "SELECT * FROM auth";
  db.query(query, [email, email], (err, result) => {
    console.log(result);
    cb(result);
  });
};

module.exports = { Payment, UpdatePayment, cancelPlan, getUsersLogged,getUserList };
