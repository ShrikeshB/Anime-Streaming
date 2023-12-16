const db = require("../DB");

const insertChat = (req) => {
  const UID = req.params.UID;
  const { msg } = req.body;
  const { postDate } = req.body;
  const data = {
    CID: "",
    UID: UID,
    Chat: msg,
    Date: postDate,
  };
  const query = "INSERT INTO chats SET ?";
  db.query(query, data, (err, res) => {
    if (err) console.log("err in chat");
    else console.log("chat inserted");
  });
  console.log(UID);
};

const getChats = (req, callBack) => {
  const UID = req.params.UID;

  const query = "SELECT * FROM Chats INNER JOIN auth ON Chats.UID=auth.UID ORDER BY CID ASC";
  db.query(query, (err, res) => {
    if (err) console.log("err in getting chats");
    else {
      callBack(res);
    }   
  });
};
module.exports = { insertChat, getChats };
