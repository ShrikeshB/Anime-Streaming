// All modules importing here..
const express = require("express");
const cors = require("cors");
const db = require("./DB");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const { Server } = require("socket.io");
const http = require("http");
const razorPay = require("razorpay");
const server = http.createServer(app);

//! used to delete the file via the path..
const fs = require("fs");
const path = require("path");
const delFiles = (path, n) => {
  if (fs.existsSync(path)) {
    console.log("exists" + n);
    fs.unlink(path, (er) => {
      if (!er) {
        console.log("media deleted");
      }
    });
  } else {
    console.log("dont exist-" + n);
  }
};

// check if server is connected to database...
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//! AnimeDesc...
app.get("/AnimeDesc/:AID", (req, res) => {
  console.log("----------- Anime Episode -------------");

  const id = req.params.AID;
  // console.log(id);
  const query = "SELECT * FROM anime WHERE AID=?";
  db.query(query, id, (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
      // console.log(result);
    }
  });
});

// img storage config
var imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    let n = file.fieldname;
    // used to assign destination as per the name of the input field...
    switch (n) {
      case "poster":
        callback(null, "./uploads/Posters");
        break;

      case "coverPage":
        callback(null, "./uploads/Cover");
        break;

      case "TrailerVideo":
        callback(null, "./uploads/Trailer");
        break;

      case "Clip":
        callback(null, "./uploads/Clips");
        break;
    }
  },
  //new file name
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only img"));
  }
};

var upload = multer({
  storage: imgConfig,
  // fileFilter: isImage,
});

//! Add Anime...
app.post(
  "/register",
  upload.fields([
    { name: "poster", maxCount: 10 },
    { name: "coverPage", maxCount: 10 },
    { name: "TrailerVideo", maxCount: 10 },
    { name: "Clip", maxCount: 10 },
  ]),
  (req, res) => {
    const posterImg = req.files.poster[0].filename;
    const coverPageImg = req.files.coverPage[0].filename;
    const TrailerVideo = req.files.TrailerVideo[0].filename;
    const Clip = req.files.Clip[0].filename;
    const { title } = req.body;
    const { Desc } = req.body;
    const { Lang } = req.body;
    const { genre } = req.body;
    const { seasons } = req.body;
    const { episodes } = req.body;
    const { episode_length } = req.body;
    const { tags } = req.body;
    const { IMDB } = req.body;
    const { ReleaseDate } = req.body;
    const { Status } = req.body;
    if (genre === "undefined") {
      genre = "Shounen";
    }

    // console.log(genre);
    console.log(req.body);

    try {
      const data = {
        Trailer_Link: TrailerVideo,
        Clip: Clip,
        Poster_Image: posterImg,
        Cover_Image: coverPageImg,
        Title: title,
        Description: Desc,
        Lang: Lang,
        Episodes: episodes,
        Seasons: seasons,
        Genre: genre,
        Episode_Length: episode_length,
        Release_Date: ReleaseDate,
        IMDB_Rating: IMDB,
        Status: Status,
        Tags: tags,
      };

      db.query("INSERT INTO anime SET ?", data, (err, result) => {
        if (err) console.log("insert failed!");
        else {
          console.log("done");
          res.status(201).json({ status: 201, data: req.body });
        }
      });
    } catch (error) {
      res.status(442).json({ status: 442, error });
    }
  }
);

//! Add episodes...
let VideoFilePath1080 = "other";
let VideoFilePath720 = "other";
let VideoFilePath480 = "other";
let CoverImgFilePath = "other";
var EpisodeImg = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("*****************************");
    console.log(file);
    switch (file.fieldname) {
      case "CoverImg":
        callback(null, "./uploads/Episode/CoverImg");
        break;
      case "VideoLink1080":
        const path1 = "./uploads/Episode/EpisodeVideo";
        callback(null, path1);
        break;
      case "VideoLink720":
        const path2 = "./uploads/Episode/EpisodeVideo";
        callback(null, path2);
        break;
      case "VideoLink480":
        const path3 = "./uploads/Episode/EpisodeVideo";
        callback(null, path3);
        break;
    }
  },

  filename: (req, file, callback) => {
    switch (file.fieldname) {
      case "CoverImg":
        CoverImgFilePath = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink1080":
        VideoFilePath1080 = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink720":
        VideoFilePath720 = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink480":
        VideoFilePath480 = `${Date.now()}.${file.originalname}`;
        break;
    }

    callback(null, `${Date.now()}.${file.originalname}`);
  },
});

//! New Episode
var EpUpload = multer({ storage: EpisodeImg });
app.post(
  "/NewEpisode/:AnimeName",
  EpUpload.fields([
    { name: "CoverImg", maxCount: 10 },
    { name: "VideoLink1080", maxCount: 10 },
    { name: "VideoLink720", maxCount: 10 },
    { name: "VideoLink480", maxCount: 10 },
  ]),
  (req, res) => {
    const AnimeName = req.params.AnimeName;
    const CoverImg = req.files.CoverImg[0].filename;
    const VideoLink1080 = req.files.VideoLink1080[0].filename;
    const VideoLink720 = req.files.VideoLink720[0].filename;
    const VideoLink480 = req.files.VideoLink480[0].filename;
    const { EpName } = req.body;
    const { EpNo } = req.body;
    const { SeasonNo } = req.body;
    const { AnimeID } = req.body;
    console.log(req.files);
    console.log("-----------------------");
    console.log(CoverImgFilePath);
    console.log("-----------------------");

    fs.mkdirSync("./uploads/Episode/EpisodeVideo/" + AnimeName, {
      recursive: true,
    });

    fs.mkdirSync("./uploads/Episode/EpisodeVideo/" + AnimeName + "/1080", {
      recursive: true,
    });

    fs.mkdirSync("./uploads/Episode/EpisodeVideo/" + AnimeName + "/720", {
      recursive: true,
    });
    fs.mkdirSync("./uploads/Episode/EpisodeVideo/" + AnimeName + "/480", {
      recursive: true,
    });

    fs.mkdirSync("./uploads/Episode/CoverImg/" + AnimeName, {
      recursive: true,
    });

    var flag1080 = false;
    var flag720 = false;
    var flag480 = false;

    const oldPath1080 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath1080;
    const newPath1080 =
      "./uploads/Episode/EpisodeVideo/" +
      AnimeName +
      "/1080/" +
      VideoFilePath1080;

    const p1 = "./uploads/Episode/EpisodeVideo/" + AnimeName + "/1080";
    if (fs.existsSync(p1)) {
      flag1080 = true;

      fs.renameSync(oldPath1080, newPath1080, (err) => {
        console.log("done rename");
        flag1080 = true;
      });
    }

    const oldPath720 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath720;
    const newPath720 =
      "./uploads/Episode/EpisodeVideo/" +
      AnimeName +
      "/720/" +
      VideoFilePath720;

    const p2 = "./uploads/Episode/EpisodeVideo/" + AnimeName + "/720";
    if (fs.existsSync(p2)) {
      flag720 = true;

      fs.renameSync(oldPath720, newPath720, (err) => {
        console.log("done rename");
        flag720 = true;
      });
    }

    const oldPath480 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath480;
    const newPath480 =
      "./uploads/Episode/EpisodeVideo/" +
      AnimeName +
      "/480/" +
      VideoFilePath480;

    const p3 = "./uploads/Episode/EpisodeVideo/" + AnimeName + "/480";
    if (fs.existsSync(p3)) {
      flag480 = true;

      fs.renameSync(oldPath480, newPath480, (err) => {
        console.log("done rename");
        flag480 = true;
      });
    }

    const oldPath1 = "./uploads/Episode/CoverImg/" + CoverImgFilePath;
    const newPath1 =
      "./uploads/Episode/CoverImg/" + AnimeName + "/" + CoverImgFilePath;

    fs.renameSync(oldPath1, newPath1, (err) => {
      console.log("done rename");
    });
    try {
      const data = {
        AID: AnimeID,
        CoverImage: CoverImg,
        VideoLink1080: VideoLink1080,
        VideoLink720: VideoLink720,
        VideoLink480: VideoLink480,
        EpisodeName: EpName,
        EpisodeNumber: EpNo,
        SeasonNumber: SeasonNo,
      };
      console.log(flag1080);
      if (flag1080 && flag480 && flag720) {
        db.query("INSERT INTO episodes SET ?", data, (err, result) => {
          if (err) console.log("failed to insert the episode!");
          else {
            console.log("successfully episode uploaded...");
            res.status(201).json({ status: 201, data: req.body });
          }
        });
      }
    } catch (error) {
      res.status(442).json({ status: 442, error });
    }

    // console.log(req.files);
  }
);

//! Get anime via genre..
app.get("/getCardData/:genre", (req, res) => {
  const genre = req.params.genre;
  db.query("SELECT * FROM anime WHERE Genre=?", genre, (err, result) => {
    if (err) console.log("err genre fetch");
    else res.send(result);
  });
});

//! getOnGoingAnimeData..
app.get("/getOnGoingAnimeData", (req, res) => {
  db.query(
    "SELECT * FROM anime WHERE Status = ?",
    "On Going",
    (err, result) => {
      // res.status(201).json({ status: 201, data: result });
      res.send(result);
    }
  );
});

app.get("/getAnimeData", (req, res) => {
  db.query("SELECT * FROM anime", (err, result) => {
    // res.status(201).json({ status: 201, data: result });
    res.send(result);
  });
});
app.get("/getAnimeData/:key", (req, res) => {
  const { key } = req.params;
  const query =
    "SELECT * FROM ANIME WHERE Tags LIKE" +
    db.escape("%" + key + "%") +
    "OR Title LIKE" +
    db.escape("%" + key + "%");
  db.query(query, [key, key], (err, result) => {
    // res.status(201).json({ status: 201, data: result });
    res.send(result);
  });
});

//! ------------------------ / Section ----------------------

//! admin login..
app.post("/AdminLogin", (req, res) => {
  const { Login_Username } = req.body;
  const { Login_Password } = req.body;

  const query = "SELECT * FROM admin WHERE Username=? AND Password=?";
  db.query(query, [Login_Username, Login_Password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result != null) {
      res.send(result);
    } else {
      res.send("no user");
    }
  });
});

//! Login...
app.post("/Login", (req, res) => {
  const { Login_Username } = req.body;
  const { Login_Password } = req.body;
  console.log(Login_Password);
  const query =
    "SELECT * FROM auth WHERE (Email=? OR (Mobile=? AND Mobile > 0)) AND Password=?";
  db.query(
    query,
    [Login_Username, Login_Username, Login_Password],
    (err, result) => {
      if (err) {
        // res.send({ err: err });
        console.log("err in query");
      }

      if (result != null) {
        res.send(result);
      } else {
        res.send("no user");
      }
    }
  );
});

//! Signup...
app.post("/Signup", (req, res) => {
  const { Username } = req.body;
  const { Email } = req.body;
  const { Password } = req.body;
  let verifier = false;
  const query1 = "SELECT * FROM AUTH WHERE Email = ?";
  db.query(query1, Email, (err, result, field) => {
    if (err) {
      console.log("---- err in Email duplication verification ---");
      console.log(err);
    } else {
      if (result != null && result.length > 0) {
        console.log(result.length);
        res.send("same user");
        verifier = true;
      } else {
        console.log("new user");

        const data = {
          UID: "",
          Profile_Img: "none",
          Username: Username,
          Email: Email,
          Mobile: 0,
          Password: Password,
        };
        console.log(data);
        const query = "INSERT INTO auth SET ?";
        db.query(query, data, (err, result) => {
          if (err) {
            res.send("err");
            console.log(err);
          }

          res.send(result);
        });
      }
    }
  });

  if (verifier == false) {
    console.log("insert");
  }
});

app.post("/checkForSameUser", (req, res) => {
  const { Email } = req.body;
  const query1 = "SELECT * FROM AUTH WHERE Email = ?";

  db.query(query1, Email, (err, result, field) => {
    if (err) {
      console.log("err in checking same user");
    } else {
      if (result != null && result.length > 0) {
        console.log(result.length);
        res.send("same user");
        verifier = true;
      } else {
        res.send("new user");
      }
    }
  });
});

//! get user data..
app.get("/getUserData/:UID", (req, res) => {
  const UID = req.params.UID;
  const query = "SELECT * FROM auth WHERE UID=?";
  db.query(query, UID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
let newPath = null;
const AuthIMgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, "./uploads/profile");
  },
  filename: (req, file, callback) => {
    newPath = `${Date.now()}.${file.originalname}`;
    callback(null, `${Date.now()}.${file.originalname}`);
  },
});
const authUp = multer({ storage: AuthIMgConfig });
const {
  UpdateAuth,
  updatePassword,
  forgotPassword,
  updateMobile,
  UpdateEmail,
} = require("./Modules/Auth");

app.post("/updateAuth", authUp.single("profile"), (req, res) => {
  const { UID } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  const { oldProfile } = req.body;

  let profileImg = oldProfile;
  try {
    console.log(req.file.filename);
    profileImg = req.file.filename;
  } catch (e) {}
  console.log(profileImg);
  UpdateAuth(UID, username, email, profileImg, (result) => {
    console.log(result);
    if (result.affectedRows >= 1) {
      res.send("done");
    } else {
      res.send("");
    }
  });
});

app.post("/updateMobile", (req, res) => {
  updateMobile(req, (res) => {
    console.log(res);
  });
});
//* update Password
app.post("/updatePassword/:UID", (req, res) => {
  const UID = req.params.UID;
  const { newPass } = req.body;
  updatePassword(UID, newPass, (result) => {
    console.log(result.affectedRows);
    if (result.affectedRows == 1) {
      res.send("updated");
    } else {
      res.send("error");
    }
  });
});

//* update email
app.post("/updateEmail/:UID", (req, res) => {
  const UID = req.params.UID;
  const { email } = req.body;
  UpdateEmail(UID, email, (result) => {
    console.log(result.affectedRows);
    if (result.affectedRows == 1) {
      res.send("updated");
    } else {
      res.send("error");
    }
  });
});

app.post("/forgotPassword", (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.body;
  console.log(newPassword);
  forgotPassword(email, newPassword, (result) => {
    console.log(result.affectedRows);
    if (result.affectedRows == 1) {
      res.send("updated");
    } else {
      res.send("error");
    }
  });
});

// used to get the last user Id, so that it can help in sign up process..
app.get("/getLastUser", (req, res) => {
  const query = "SELECT UID FROM AUTH ORDER BY UID DESC LIMIT 1";
  db.query(query, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    else res.send(result);
  });
});

//! Episode Sections...

//! get all Episodes of particular anime via AID & season...
app.get("/getEpisode/:AID/:Season", (req, res) => {
  const AID = req.params.AID;
  const Season = req.params.Season;
  const query =
    "SELECT * FROM episodes INNER JOIN anime ON episodes.AID = anime.AID AND episodes.AID=? AND SeasonNumber=?";
  db.query(query, [AID, Season], (err, result) => {
    if (err) {
      res.status(442).json({ status: 442, error });
    } else {
      res.send(result);

      console.log("------------/getEpisode/:AID---------");
      // console.log(result);
    }
  });
});

//! search ep with key
app.get("/searchEpisode/:AID/:key", (req, res) => {
  const AID = req.params.AID;
  const key = req.params.key;
  const query =
    "SELECT * FROM episodes INNER JOIN anime ON episodes.AID = anime.AID AND episodes.AID=? AND EpisodeName LIKE" +
    db.escape("%" + key + "%");
  db.query(query, [AID, key], (err, result) => {
    if (err) {
      res.status(442).json({ status: 442, error });
    } else {
      res.send(result);

      console.log("------------/getEpisode/:AID---------");
      console.log(result);
    }
  });
});

//! get single Episode via EID,AID,SNo...
app.get("/PlayEpisode/:EID", (req, res) => {
  const EID = req.params.EID;
  console.log("EID=" + EID);
  console.log("----------{ /PlayEpisode/:EID }------------");
  // const query = "SELECT * FROM episodes e INNER JOIN anime a ON e.AID=a.AID AND e.EpisodeNumber=?";
  const query =
    "SELECT * FROM episodes e INNER JOIN anime ON e.AID = anime.AID AND e.EID=? ";
  // "SELECT * FROM episodes where EpisodeNumber=? AND AID=? AND SeasonNumber=? ";

  db.query(query, [EID], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//! get single Episode via EID...
app.get("/getSingleEpisode/:EID", (req, res) => {
  const EID = req.params.EID;
  const query =
    "SELECT * FROM episodes e INNER JOIN anime ON e.AID = anime.AID AND e.EID=? ";

  db.query(query, [EID], (err, result) => {
    if (err) {
    } else {
      console.log(result);

      res.send(result);
    }
  });
});

//! get Anime via season no & AID
app.get("/getAnime/:AID/:SNo", (req, res) => {
  const AID = req.params.AID;
  const SNo = req.params.SNo;
  console.log(SNo);
  const query =
    "SELECT * FROM episodes INNER JOIN anime ON episodes.AID = anime.AID AND episodes.AID=? AND SeasonNumber=?";
  db.query(query, [AID, SNo], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
      console.log("------------/getAnime/:AID/:SNo---------");
      // console.log(result);
    }
  });
});

//! get All episodes via AID...
app.get("/getAllEpisodes/:AID", (req, res) => {
  const AID = req.params.AID;
  const query = "SELECT * FROM episodes where AID=?";
  db.query(query, AID, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

//! ******** Update Section ************

var UpdateEpisodeImg = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("*****************************");
    console.log(file);
    switch (file.fieldname) {
      case "CoverImg":
        callback(null, "./uploads/Episode/CoverImg");
        break;
      case "VideoLink1080":
        const path1 = "./uploads/Episode/EpisodeVideo";
        callback(null, path1);
        break;
      case "VideoLink720":
        const path2 = "./uploads/Episode/EpisodeVideo";
        callback(null, path2);
        break;
      case "VideoLink480":
        const path3 = "./uploads/Episode/EpisodeVideo";
        callback(null, path3);
        break;
    }
  },

  filename: (req, file, callback) => {
    switch (file.fieldname) {
      case "CoverImg":
        CoverImgFilePath = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink1080":
        VideoFilePath1080 = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink720":
        VideoFilePath720 = `${Date.now()}.${file.originalname}`;
        break;
      case "VideoLink480":
        VideoFilePath480 = `${Date.now()}.${file.originalname}`;
        break;
    }

    callback(null, `${Date.now()}.${file.originalname}`);
  },
});

var up = multer({ storage: UpdateEpisodeImg });
//* update Episode..
app.post(
  "/updateEpisode/:EID",
  up.fields([
    { name: "CoverImg", maxCount: 10 },
    { name: "VideoLink1080", maxCount: 10 },
    { name: "VideoLink720", maxCount: 10 },
    { name: "VideoLink480", maxCount: 10 },
  ]),
  (req, res) => {
    updateEpisode(
      req,
      CoverImgFilePath,
      VideoFilePath1080,
      VideoFilePath720,
      VideoFilePath480
    );
  }
);

//* update Anime...
// img storage config
var imgConfig1 = multer.diskStorage({
  destination: (req, file, callback) => {
    let n = file.fieldname;
    // console.log(req.files);
    // used to assign destination as per the name of the input field...
    switch (n) {
      case "AnimePoster":
        callback(null, "./uploads/Posters");
        break;

      case "AnimeCoverPage":
        callback(null, "./uploads/Cover");
        break;

      case "AnimeTrailerLink":
        callback(null, "./uploads/Trailer");
        break;

      case "AnimeClipLink":
        callback(null, "./uploads/Clips");
        break;
      default:
        break;
    }
  },
  //new file name
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${file.originalname}`);
  },
});
var upAnime = multer({ storage: imgConfig1 });

//* update Anime
app.post(
  "/updateAnime/:AID",

  upAnime.fields([
    { name: "AnimePoster", maxCount: 10 },
    { name: "AnimeCoverPage", maxCount: 10 },
    { name: "AnimeTrailerLink", maxCount: 10 },
    { name: "AnimeClipLink", maxCount: 10 },
  ]),
  (req, res) => {
    updateAnime(req);
  }
);

//! get Season count via AID...
app.get("/getSeasonCount/:AID", (req, res) => {
  const AID = req.params.AID;
  const query =
    "SELECT MAX(SeasonNumber) AS TotalSeason FROM episodes WHERE AID=?";
  db.query(query, AID, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});

//! Delete section..

//! Delete Anime via AID..
app.get("/deleteAnime/:AID", (req, res) => {
  const AID = req.params.AID;
  const query = "DELETE FROM anime WHERE AID=?";
  const query1 = "SELECT * FROM anime WHERE AID=?";
  const query2 =
    "SELECT * FROM episodes e INNER JOIN anime a HAVING e.AID = a.AID AND a.AID=?";

  console.log("-----------delete OP ------------");

  // used to delete the media files from anime
  db.query(query1, AID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      delFiles(
        "D:/WebD-journey/React/AnimeOTT/server/uploads/Clips/" + result[0].Clip,
        "anime"
      );
      delFiles(
        "D:/WebD-journey/React/AnimeOTT/server/uploads/Cover/" +
          result[0].Cover_Image,
        "anime"
      );
      delFiles(
        "D:/WebD-journey/React/AnimeOTT/server/uploads/Posters/" +
          result[0].Poster_Image,
        "anime"
      );
      delFiles(
        "D:/WebD-journey/React/AnimeOTT/server/uploads/Trailer/" +
          result[0].Trailer_Link,
        "anime"
      );
      console.log(result[0].Cover_Image);
    }
  });

  // used to delete the media files from episode..

  db.query(query2, AID, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      if (result1[0] != "undefined") {
        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/CoverImg/" +
            result1[0].Title +
            "/" +
            result1[0].CoverImage,
          "episode"
        );
        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/" +
            result1[0].VideoLink,
          "episode"
        );
        console.log(result1[0]);
      } else {
        console.log("Anime has no episodes..");
      }
    }
  });

  // delete query to delete the anime..
  db.query(query, AID, (err, result1) => {
    if (err) {
      console.log(err);
      res.status(442).json({ status: 442 });
    } else {
      console.log(result1);
      res.status(201).json({ status: 201 });
    }
  });
});

//! delete episode...
app.get("/deleteEpisode/:EID", (req, res) => {
  const EID = req.params.EID;
  const query = "DELETE FROM episodes WHERE EID=?";
  const query2 =
    "SELECT * FROM episodes e INNER JOIN anime a HAVING e.AID = a.AID AND EID=?";

  console.log("-----------delete OP ------------");

  // used to delete the media files from episode..
  db.query(query2, EID, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result1);
      if (result1[0] != "undefined") {
        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/CoverImg/" +
            result1[0].Title +
            "/" +
            result1[0].CoverImage,
          "episode"
        );
        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/1080/" +
            result1[0].VideoLink1080,
          "episode"
        );

        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/720/" +
            result1[0].VideoLink720,
          "episode"
        );

        delFiles(
          "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/480/" +
            result1[0].VideoLink480,
          "episode"
        );
        console.log(result1[0]);
      } else {
        console.log("Anime has no episodes..");
      }
    }
  });

  // delete query to delete the anime..
  db.query(query, EID, (err, result1) => {
    if (err) {
      console.log(err);
      res.status(442).json({ status: 442 });
    } else {
      console.log(result1);
      res.status(201).json({ status: 201 });
    }
  });
});

//! **************** Billing section ****************

//! Payment process...
const {
  Payment,
  UpdatePayment,
  cancelPlan,
  getUsersLogged,
  getUserList,
} = require("./Modules/Payment");
app.post("/Payment", (req, res) => {
  const { UID } = req.body;
  const { plan } = req.body;
  const { price } = req.body;
  const result = Payment(UID, plan, price);
  console.log(result);
  res.send(result);
});

//! used to get the billing details of specific user
app.get("/getBilling/:UID", (req, res) => {
  const UID = req.params.UID;
  const query = "SELECT * FROM BILLING WHERE UID=?";
  db.query(query, UID, (err, result) => {
    if (err) {
      console.log("something went wrong....");
    } else {
      if (result.length > 0) res.send(result);
      else res.send(null);
      console.log(res);
    }
  });
});

app.post("/updatePayment/:UID/:Users", (req, res) => {
  const UID = req.params.UID;
  const Users = req.params.Users;
  UpdatePayment(UID, Users);
});

app.post("/cancelPlan/:UID", (req, res) => {
  const UID = req.params.UID;
  cancelPlan(UID, (result) => {
    console.log(result);
  });
});

app.get("/getUsersLogged/:email", (req, res) => {
  // getUsersLogged(req, (result) => {
  //   console.log(result);
  //   res.send(result);
  // });
  getUserList((result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/userlist", (req, res) => {
  
  const query = "SELECT * FROM auth";
  // const query = "SELECT * FROM billing b INNER JOIN auth a ON a.UID=b.UID";

  db.query(query, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/planlist", (req, res) => {
  
  // const query = "SELECT * FROM billing";
  const query = "SELECT * FROM billing b RIGHT JOIN auth a ON a.UID=b.UID";

  db.query(query, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/deleteUser/:UID", (req, res) => {
  const UID = req.params.UID;
  
  const query = "DELETE FROM auth WHERE UID=? ";
  // const query = "SELECT * FROM billing b RIGHT JOIN auth a ON a.UID=b.UID";

  db.query(query,[UID], (err, result) => {
    console.log(result);
    res.send(result);
  });
});


const instance = new razorPay({
  key_id: "rzp_test_K9TyacZ1arXQTM",
  key_secret: "baQDWiCp0FfBWbA3ZyrpnFQt",
});

app.post("/razorPay", async (req, res) => {
  const response = await instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: "receipt#1",
  });

  console.log(response);
  res.send({
    id: response.id,
    currency: response.currency,
    amount: response.amount,
  });
});

//! used to search the anime..
app.get("/SearchAnime/:key", (req, res) => {
  const key = req.params.key;
  // const query = "SELECT * FROM ANIME WHERE Tags LIKE '%"+ db.escape(key) +"%'";
  const query =
    "SELECT * FROM ANIME WHERE Tags LIKE" +
    db.escape("%" + key + "%") +
    "OR Title LIKE" +
    db.escape("%" + key + "%");
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//! ***************** watchlist section *******************

//! used to add to watchlist..
const { WatchList, DeleteWatchList } = require("./Modules/WatchList");
app.post("/AddToWatchList/:AID/:UID", (req, res) => {
  const AID = req.params.AID;
  const UID = req.params.UID;
  WatchList(AID, UID);
  res.send("Added to WatchList");
});
app.get("/getWatchList/:UID/:AID", (req, res) => {
  const query = "SELECT * FROM watchlist WHERE UID=? AND AID=?";
  // "SELECT * FROM anime a INNER JOIN WatchList w ON a.AID=w.AID WHERE UID=?";

  const UID = req.params.UID;
  const AID = req.params.AID;
  db.query(query, [UID, AID], (err, result) => {
    if (err) console.log("getting WatchList error!");
    else {
      console.log("------------- WatchList --------------");
      console.log(result);
      res.send(result);
    }
  });
});
//! get all the anime data from WatchList..
app.get("/getWatchListAnime/:UID", (req, res) => {
  const query =
    "SELECT * FROM anime a INNER JOIN watchlist w ON a.AID=w.AID WHERE UID=?";

  const UID = req.params.UID;
  db.query(query, UID, (err, result) => {
    if (err) console.log("getting WatchList error!");
    else {
      console.log("------------- WatchList --------------");
      console.log(result);
      res.send(result);
    }
  });
});
//! delete anime from WatchList..
app.get("/deleteWatchList/:UID/:AID", (req, res) => {
  const UID = req.params.UID;
  const AID = req.params.AID;
  DeleteWatchList(AID, UID);
  res.send("Anime removed from WatchList");
});

//! Continue Watching...
const {
  ContinueWatching,
  deleteCW,
  updateCW,
} = require("./Modules/ContinueWatching");
app.post("/ContinueWatching", (req, res) => {
  const { UID } = req.body;
  const { AID } = req.body;
  const { EID } = req.body;
  const { SNo } = req.body;

  const query = "SELECT * FROM continuewatching WHERE UID=? AND AID=?";
  db.query(query, [UID, AID], (err, result) => {
    if (err) console.log("error in CW");
    else {
      if (result.length <= 0) {
        ContinueWatching(UID, AID, EID, SNo);
      } else {
        console.log("CW already exits");
        updateCW(UID, AID, EID, SNo);
      }
    }
  });

  // ContinueWatching(UID,AID);
});
app.get("/getContinueWatching/:UID", (req, res) => {
  const UID = req.params.UID;
  const query =
    "SELECT * FROM continuewatching c INNER JOIN anime a ON c.AID=a.AID INNER JOIN episodes e ON c.EID=e.EID AND UID=?";
  db.query(query, UID, (err, result) => {
    if (err) console.log("err fetching CW data!");
    else {
      if (result.length > 0) res.send(result);
      else res.send(null);
    }
  });
});
app.get("/deleteCW/:UID/:AID", (req, res) => {
  const UID = req.params.UID;
  const AID = req.params.AID;
  deleteCW(UID, AID);
  res.send("CW anime deleted..");
});

//! Episode Progress...
const { Ep_Progress, Update_Ep_Progress } = require("./Modules/Ep_Progress");
const { updateEpisode, updateAnime } = require("./Modules/Updates");
const { insertChat, getChats } = require("./Modules/Chats");
app.post("/ep_Progress", (req, res) => {
  const { UID } = req.body;
  const { AID } = req.body;
  const { EID } = req.body;
  const { Progress } = req.body;
  console.log(EID);

  const query = "SELECT * FROM ep_progress WHERE UID=? AND AID=? AND EID=?";
  db.query(query, [UID, AID, EID], (err, result) => {
    if (err) console.log("error in CW");
    else {
      if (result.length <= 0) {
        Ep_Progress(UID, AID, EID, Progress);
      } else {
        Update_Ep_Progress(Progress, UID, EID);
      }
    }
  });
});
//! get Episode Progress data..
app.get("/getEp_progress/:UID/:AID/:EID", (req, res) => {
  const UID = req.params.UID;
  const AID = req.params.AID;
  const EID = req.params.EID;
  const query = "SELECT * FROM ep_progress WHERE UID=? AND AID=? AND EID=?";
  //  console.log("AID="+EID);
  db.query(query, [UID, AID, EID], (err, result) => {
    if (err) console.log("error in CW");
    else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send(null);
        // console.log("null");
      }
    }
  });
});

//! ************* Chats Section *************
app.post("/insertChat/:UID", (req, res) => {
  insertChat(req);
});

app.get("/getChats/:UID", (req, res) => {
  getChats(req, (result) => {
    console.log(result);
    res.send(result);
  });
});

//! ************ News Section **********************
let newPathNews = null;
const NewsIMgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, "./uploads/News");
  },
  filename: (req, file, callback) => {
    newPathNews = `${Date.now()}.${file.originalname}`;
    callback(null, `${Date.now()}.${file.originalname}`);
  },
});

const uploadNews = multer({
  storage: NewsIMgConfig,
});

const {
  getNews,
  getNewsByNID,
  addNews,
  updateNews,
  deleteNews,
  getNewsRecommendation,
  getNewsByGenre,
  getNewsByTitle,
} = require("./Modules/News");
app.get("/getNews", (req, res) => {
  getNews((result) => {
    // console.log(result);
    res.send(result);
  });
});
app.get("/getNewsByTitle/:key", (req, res) => {
  getNewsByTitle(req, (result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/getNewsRecommendation", (req, res) => {
  getNewsRecommendation(req, (result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/getNewsByNID/:NID", (req, res) => {
  getNewsByNID(req, (result) => {
    console.log(result);
    res.send(result);
  });
});
app.get("/getNewsByGenre/:Genre", (req, res) => {
  getNewsByGenre(req, (result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/addNews", uploadNews.single("newsCoverPage"), (req, res) => {
  console.log(newPathNews);
  addNews(req, newPathNews, (result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/deleteNews/:NID", (req, res) => {
  const { NID } = req.params;
  deleteNews(NID, (res) => {
    console.log(res);
  });
});

var UpdateNewsImgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    callback(null, "./uploads/News");
  },
  filename: (req, file, callback) => {
    newPathNews = `${Date.now()}.${file.originalname}`;
    callback(null, `${Date.now()}.${file.originalname}`);
  },
});

const uploadNews1 = multer({
  storage: UpdateNewsImgConfig,
});

app.post("/updateNews/:NID", uploadNews1.single("coverImg"), (req, res) => {
  const { NID } = req.params;
  updateNews(req, NID);
});

//! ********* Dashboard **************
const {
  getTotalUsers,
  getTotalAnime,
  getTotalRevenue,
  getStandardPlanCount,
  getPremiumPlanCount,
  getBasicPlanCount,
  getGenreCount,
} = require("./Modules/Dashboard");
//* user count
app.get("/getTotalUsers", (req, res) => {
  getTotalUsers((result) => {
    console.log(result);
    res.send(result);
  });
});

//* anime count
app.get("/getTotalAnime", (req, res) => {
  getTotalAnime((result) => {
    console.log(result);
    res.send(result);
  });
});

//* sum of revenue
app.get("/getTotalRevenue", (req, res) => {
  getTotalRevenue((result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/getBasicPlanCount", (req, res) => {
  getBasicPlanCount((result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/getStandardPlanCount", (req, res) => {
  getStandardPlanCount((result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/getPremiumPlanCount", (req, res) => {
  getPremiumPlanCount((result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/getGenreCount/:genre", (req, res) => {
  const { genre } = req.params;
  getGenreCount(genre, (result) => {
    console.log(result);
    res.send(result);
  });
});

app.use("/uploads/Posters", express.static("./uploads/Posters"));
app.use("/uploads/Cover", express.static("./uploads/Cover"));
app.use("/uploads/Clips", express.static("./uploads/Clips"));
app.use("/uploads/Trailer", express.static("./uploads/Trailer"));
app.use("/uploads/profile", express.static("./uploads/profile"));
app.use("/uploads/News", express.static("./uploads/News"));
app.use(
  "/uploads/Episode/CoverImg",
  express.static("./uploads/Episode/CoverImg")
);
app.use(
  "/uploads/Episode/EpisodeVideo",
  express.static("./uploads/Episode/EpisodeVideo")
);

// app.listen(3002, () => {
//   console.log("Server running on 3002..");
// });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("sending", (data) => {
    console.log(data);
    socket.broadcast.emit("receive", data);
  });
});

server.listen("3002", () => {
  console.log("running 3002");
});
