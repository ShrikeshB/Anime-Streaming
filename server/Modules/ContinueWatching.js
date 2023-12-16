const db = require("../DB");

const ContinueWatching = (UID, AID, EID, SNo) => {
  const query = "INSERT INTO continuewatching SET ?";

  const data = {
    CID: "",
    AID: AID,
    UID: UID,
    EID: EID,
    SNo: SNo,
  };
  db.query(query, data, (err, result) => {
    if (err) console.log("Continue watching error");
    else {
      console.log("Anime Added To Continue watching");
    }
  });
};

const deleteCW = (UID, AID) => {
  const query = "DELETE FROM continuewatching WHERE UID=? AND AID=?";
  db.query(query, [UID, AID], (err, result) => {
    if (err) console.log("err in deleting CW!");
    else console.log("CW deleted..");
  });
};

// const updateCW = (UID, AID, EID, SNo) => {
//   const query1 = "SELECT * FROM continuewatching WHERE UID=? AND AID=? ";
//   const query = "UPDATE continuewatching SET EID=?";
//   db.query(query1, [UID, AID], (err, res) => {
//     console.log(res);
//     if (res[0].EID < EID) {
//       db.query(query, [EID], (err, res1) => {
//         console.log("CW updated!");
//       });
//     }
//   });
// };

const updateCW = (UID, AID, EID, SNo) => {
  const query1 =
    "SELECT * FROM continuewatching WHERE UID=? AND AID=? AND EID=? ";
  const query = "UPDATE continuewatching SET EID=?,SNo=?";
  db.query(query1, [UID, AID, EID], (err, res) => {
    console.log(res);
    if (res.length <= 0) {
      db.query(query, [EID,SNo], (err, res1) => {
        console.log("CW updated!");
      });
    }
  });
};

module.exports = { ContinueWatching, deleteCW, updateCW };
