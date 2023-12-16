const db = require("../DB");

const WatchList = (AID, UID) => {
  const query = "INSERT INTO watchlist SET ?";

  const data = {
    WID: "",
    UID: UID,
    AID: AID,
  };
  db.query(query, data, (err, result) => {
    if (err) console.log("WatchList error");
    else console.log("Anime Added To WatchList");
  });
};

const DeleteWatchList = (AID, UID) => {
  const query = "DELETE FROM watchlist WHERE UID=? AND AID=?";
  db.query(query, [UID, AID], (err, result) => {
    if (err) console.log("WatchList error");
    else console.log("Anime Added To WatchList");
  });
};

module.exports = { WatchList, DeleteWatchList };
