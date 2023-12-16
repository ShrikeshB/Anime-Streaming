const multer = require("multer");
const db = require("../DB");
const fs = require("fs");

const delFiles = (path) => {
  if (fs.existsSync(path)) {
    console.log("exists");
    fs.unlink(path, (er) => {
      if (!er) {
        console.log("media deleted");
        console.log(path);
      }
    });
  } else {
    console.log("dont exist- " + path);
  }
};

const getNews = (callback) => {
  const query = "SELECT * FROM news  ORDER BY NID DESC";
  db.query(query, (err, res) => {
    if (err) console.log("er in fetching news");
    else {
      callback(res);
    }
  });
};

const getNewsByTitle = (req, callback) => {
  const { key } = req.params;
  const query =
    "SELECT * FROM news WHERE Title LIKE " +
    db.escape("%" + key + "%") +
    "OR Tags LIKE" +
    db.escape("%" + key + "%");
  db.query(query, (err, res) => {
    if (err) console.log("er in fetching news");
    else {
      callback(res);
    }
  });
};

const getNewsRecommendation = (req, callback) => {
  const query = "SELECT * FROM news ORDER BY NID DESC LIMIT 3";
  db.query(query, (err, res) => {
    if (err) console.log("er in fetching news ");
    else {
      callback(res);
    }
  });
};

const getNewsByNID = (req, callback) => {
  const { NID } = req.params;
  const query = "SELECT * FROM news WHERE NID=?";
  db.query(query, [NID], (err, res) => {
    if (err) console.log("er in fetching news ");
    else {
      callback(res);
    }
  });
};

const getNewsByGenre = (req, callback) => {
  const { Genre } = req.params;
  const query = "SELECT * FROM news WHERE Genre=?";
  db.query(query, [Genre], (err, res) => {
    if (err) console.log("er in fetching news ");
    else {
      callback(res);
    }
  });
};

const addNews = (req, newPathNews, callback) => {
  const { title } = req.body;
  const { desc } = req.body;
  const { tags } = req.body;
  const { TimeStamp } = req.body;
  const { genre } = req.body;
  let coverPage = null;
  try {
    coverPage = req.file.filename;
    const data = {
      Title: title,
      Description: desc,
      Image: coverPage,
      Genre: genre,
      Timestamp: TimeStamp,
      Tags: tags,
    };
    console.log(req.body);

    const query = "INSERT INTO news SET ?";

    db.query(query, data, (err, res) => {
      if (err) console.log(err);
      else {
        callback(res);
      }
    });
  } catch (e) {}
};

const deleteNews = (NID, callback) => {
  const Fetchquery = "SELECT * FROM news WHERE NID=?";
  const query = "DELETE FROM news WHERE NID=?";

  db.query(Fetchquery, [NID], (err, res1) => {
    if (err) console.log("err in fetching news");
    else {
      db.query(query, [NID], (err, res) => {
        if (err) console.log(err);
        else {
          console.log(res);
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/News/" +
              res1[0].Image
          );
        }
      });
    }
  });
};

const updateNews = (req, NID) => {
  const { Title } = req.body;
  const { Desc } = req.body;
  const { TimeStamp } = req.body;
  const { Tags } = req.body;
  console.log(Title != "null" ? Title : "string null");
  var coverImg = null;
  try {
    coverImg = req.file.filename;
  } catch (e) {
    coverImg = null;
  }

  const query = "SELECT * FROM news WHERE NID=?";
  db.query(query, [NID], (err, res) => {
    if (err) console.log(err);
    else {
      if (res[0] != "undefined") {
        if (coverImg != null) {
          // delete old file..
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/News/" + res[0].Image
          );
        }

        const data = {
          Title: Title != "null" ? Title : res[0].Title,
          Description: Desc != "null" ? Desc : res[0].Description,
          Image: coverImg != null ? coverImg : res[0].Image,
          Tags: Tags != "null" ? Tags : res[0].Tags,
          TimeStamp: TimeStamp != "null" ? TimeStamp : res[0].Timestamp,
        };

        const query1 =
          "UPDATE news SET Title=?,Description=?,Image=?,Tags=?,TimeStamp=? WHERE NID=?";
        db.query(
          query1,
          [
            data.Title,
            data.Description,
            data.Image,
            data.Tags,
            data.TimeStamp,
            NID,
          ],
          (err, res2) => {
            if (err) console.log(err);
            else {
              console.log("News Updated!");
            }
          }
        );
      }
    }
  });
  console.log(req.body);
};

module.exports = {
  getNews,
  getNewsByNID,
  addNews,
  deleteNews,
  updateNews,
  getNewsRecommendation,
  getNewsByGenre,
  getNewsByTitle,
};
