const db = require("../DB");

const getTotalUsers = (callback) => {
  const query = "SELECT COUNT(*) as userCount FROM auth";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};

const getTotalAnime = (callback) => {
  const query = "SELECT COUNT(*) as animeCount FROM anime";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};

const getTotalRevenue = (callback) => {
  const query = "SELECT SUM(Price) as revenue FROM billing";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};

const getBasicPlanCount = (callback) => {
  const query = "SELECT COUNT(*) as plan FROM billing WHERE Plan='Basic Plan'";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};

const getStandardPlanCount = (callback) => {
  const query =
    "SELECT COUNT(*) as plan FROM billing WHERE Plan='Standard Plan'";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};
const getPremiumPlanCount = (callback) => {
  const query =
    "SELECT COUNT(*) as plan FROM billing WHERE Plan='Premium Plan'";
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of users");
    else {
      callback(res);
    }
  });
};

const getGenreCount = (genre, callback) => {
  console.log(genre);
  const query = "SELECT COUNT(*) as genre FROM anime WHERE Genre=" + genre;
  db.query(query, (err, res) => {
    if (err) console.log("failed to fetch count of genre");
    else {
      callback(res);
    }
  });
};

module.exports = {
  getTotalUsers,
  getTotalAnime,
  getTotalRevenue,
  getBasicPlanCount,
  getStandardPlanCount,
  getPremiumPlanCount,

  getGenreCount,
};
