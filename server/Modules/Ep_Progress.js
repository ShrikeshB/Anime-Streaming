const db = require("../DB");

const Ep_Progress = (UID, AID, EID, Progress) => {
  const query = "INSERT INTO ep_progress SET ?";
  const data = {
    EP_ID: "",
    EID: EID,
    UID: UID,
    AID: AID,
    Progress: Progress,
  };
  db.query(query, data, (err, res) => {
    if (err) console.log("error in ep progress!");
    else console.log("inserting progress");
  });
};


const Update_Ep_Progress = (progress,UID,EID)=>{
  console.log("update To "+progress);
  const query = "UPDATE ep_progress SET Progress=? WHERE UID=? AND EID=?"
  db.query(query,[progress,UID,EID],(err,res)=>{
    if(err) console.log("err in updating ep progress!");
    else console.log("updating ep progress..");
  })
}

module.exports = { Ep_Progress,Update_Ep_Progress };
