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
const updateEpisode = (req, CoverImgFilePath, VideoFilePath1080,VideoFilePath720,VideoFilePath480) => {
  console.log("---------- update Episode --------");

  //   console.log(req.body);
  const EID = req.params.EID;
  const { EpNo } = req.body;
  const { EpName } = req.body;
  const { EpSeason } = req.body;
  var CoverImg = null;
  var VideoLink1080 = null;
  var VideoLink720 = null;
  var VideoLink480 = null;
  try {
    CoverImg = req.files.CoverImg[0].filename;
  } catch (error) {
    CoverImg = null;
  }

  try {
    VideoLink1080 = req.files.VideoLink1080[0].filename;
  } catch (error) {
    VideoLink1080 = null;
  }

  try {
    VideoLink720 = req.files.VideoLink720[0].filename;
  } catch (error) {
    VideoLink720 = null;
  }

  try {
    VideoLink480 = req.files.VideoLink480[0].filename;
  } catch (error) {
    VideoLink480 = null;
  }

  const query2 =
    "SELECT * FROM episodes e INNER JOIN anime a HAVING e.AID = a.AID AND EID=?";

  db.query(query2, EID, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result1);
      if (result1[0] != "undefined") {
        if (VideoLink1080 != null) {
          console.log(VideoLink1080);
          const oldPath1080 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath1080;
          const newPath1080 =
            "./uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/1080/" +
            VideoFilePath1080;

          fs.renameSync(oldPath1080, newPath1080, (err) => {
            console.log("done rename");
          });

          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
              result1[0].Title +
              "/1080/" +
              result1[0].VideoLink1080
          );
          
        }

        if (VideoLink720 != null) {
          console.log(VideoLink720);
          const oldPath720 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath720;
          const newPath720 =
            "./uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/1080/" +
            VideoFilePath720;

          fs.renameSync(oldPath720, newPath720, (err) => {
            console.log("done rename");
          });

          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
              result1[0].Title +
              "/720/" +
              result1[0].VideoLink7200
          );
        }

        if (VideoLink480 != null) {
          console.log(VideoLink480);
          const oldPath480 = "./uploads/Episode/EpisodeVideo/" + VideoFilePath480;
          const newPath480 =
            "./uploads/Episode/EpisodeVideo/" +
            result1[0].Title +
            "/1080/" +
            VideoFilePath480;

          fs.renameSync(oldPath480, newPath480, (err) => {
            console.log("done rename");
          });

          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/EpisodeVideo/" +
              result1[0].Title +
              "/480/" +
              result1[0].VideoLink480
          );
        }

        if (CoverImg != null) {
          console.log(CoverImgFilePath);

          const oldPath1 = "./uploads/Episode/CoverImg/" + CoverImgFilePath;
          const newPath1 =
            "./uploads/Episode/CoverImg/" +
            result1[0].Title +
            "/" +
            CoverImgFilePath;
          fs.renameSync(oldPath1, newPath1, (err) => {
            console.log("done rename");
          });
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Episode/CoverImg/" +
              result1[0].Title +
              "/" +
              result1[0].CoverImage
          );
        }

        const data = {
          CoverImage: CoverImg != null ? CoverImg : result1[0].CoverImage,
          VideoLink1080: VideoLink1080 != null ? VideoLink1080 : result1[0].VideoLink1080,
          VideoLink720: VideoLink720 != null ? VideoLink720 : result1[0].VideoLink720,
          VideoLink480: VideoLink480 != null ? VideoLink480 : result1[0].VideoLink480,
          EpisodeName: EpName != "null" ? EpName : result1[0].EpisodeName,
          EpisodeNumber: EpNo != "null" ? EpNo : result1[0].EpisodeNumber,
          SeasonNumber: result1[0].SeasonNumber,
          EID: EID,
        };

        const query = `UPDATE episodes SET CoverImage =? , VideoLink1080 =? ,EpisodeName =? ,EpisodeNumber =? ,
        SeasonNumber =? WHERE EID=? `;
        db.query(
          query,

          [
            data.CoverImage,
            data.VideoLink1080,
            data.EpisodeName,
            data.EpisodeNumber,
            data.SeasonNumber,
            data.EID,
          ],

          (err, result) => {
            if (err) console.log(err);
            else console.log("episode updated");
          }
        );
        // console.log(result1[0]);
      } else {
        console.log("Anime has no episodes..");
      }
    }
  });
};

const updateAnime = (req) => {
  const AID = req.params.AID;
  console.log("------------ update Anime ---------------");

  const { AnimeTitle } = req.body;
  const { AnimeDesc } = req.body;
  const { AnimeLanguage } = req.body;
  const { AnimeEpisode } = req.body;
  const { AnimeSeason } = req.body;
  const { AnimeGenre } = req.body;
  const { AnimeEpisodeLength } = req.body;
  const { AnimeDate } = req.body;
  const { AnimeIMDB } = req.body;
  const { AnimeTags } = req.body;
  const { AnimeStatus } = req.body;

  var AnimeCoverPage = null;
  var AnimeTrailerLink = null;
  var AnimePoster = null;
  var AnimeClipLink = null;

  try {
    AnimeTrailerLink = req.files.AnimeTrailerLink[0].filename;
  } catch (error) {
    AnimeTrailerLink = null;
  }

  try {
    AnimePoster = req.files.AnimePoster[0].filename;
  } catch (error) {
    AnimePoster = null;
  }

  try {
    AnimeCoverPage = req.files.AnimeCoverPage[0].filename;
  } catch (error) {
    AnimeCoverPage = null;
  }

  try {
    AnimeClipLink = req.files.AnimeClipLink[0].filename;
  } catch (error) {
    AnimeClipLink = null;
  }

  const query2 = "SELECT * FROM anime WHERE AID=?";

  db.query(query2, AID, (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      if (result1[0] != "undefined") {
        if (AnimeTrailerLink != null) {
          console.log(AnimeTrailerLink);
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Trailer/" +
              result1[0].Trailer_Link
          );
        }

        if (AnimePoster != null) {
          console.log(AnimePoster);
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Posters/" +
              result1[0].Poster_Image
          );
        }

        if (AnimeCoverPage != null) {
          console.log(AnimeCoverPage);
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Cover/" +
              result1[0].Cover_Image
          );
        }

        if (AnimeClipLink != null) {
          console.log(AnimeClipLink);
          delFiles(
            "D:/WebD-journey/React/AnimeOTT/server/uploads/Clips/" +
              result1[0].Clip
          );
        }
        const data = {
          AnimeTrailerLink:
            AnimeTrailerLink != null
              ? AnimeTrailerLink
              : result1[0].Trailer_Link,

          AnimeCoverPage:
            AnimeCoverPage != null ? AnimeCoverPage : result1[0].Cover_Image,

          AnimePoster:
            AnimePoster != null ? AnimePoster : result1[0].Poster_Image,

          AnimeClipLink:
            AnimeClipLink != null ? AnimeClipLink : result1[0].Clip,

          AnimeTitle: AnimeTitle != "null" ? AnimeTitle : result1[0].Title,
          AnimeDesc: AnimeDesc != "null" ? AnimeDesc : result1[0].Description,
          AnimeLanguage:
            AnimeLanguage != "null" ? AnimeLanguage : result1[0].Lang,
          AnimeEpisode:
            AnimeEpisode != "null" ? AnimeEpisode : result1[0].Episodes,
          AnimeSeason: AnimeSeason != "null" ? AnimeSeason : result1[0].Seasons,
          AnimeGenre: AnimeGenre != "null" ? AnimeGenre : result1[0].Genre,
          AnimeEpisodeLength:
            AnimeEpisodeLength != "null"
              ? AnimeEpisodeLength
              : result1[0].Episode_Length,
          AnimeDate: AnimeDate != "null" ? AnimeDate : result1[0].Release_Date,
          AnimeIMDB: AnimeIMDB != "null" ? AnimeIMDB : result1[0].IMDB_Rating,
          AnimeTags: AnimeTags != "null" ? AnimeTags : result1[0].Tags,
          AnimeStatus: AnimeStatus != "null" ? AnimeStatus : result1[0].Status,

          AID: AID,
        };

        const query =
          "UPDATE anime SET Trailer_Link=?, Clip=?, Poster_Image=?, Cover_Image=?,Title=?,Description=?,Lang=?,Episodes=?,Seasons=?,Genre=?,Episode_Length=?,Release_Date=?,IMDB_Rating=?,Status=?,Tags=? WHERE AID=?";

        db.query(
          query,
          [
            data.AnimeTrailerLink,
            data.AnimeClipLink,
            data.AnimePoster,
            data.AnimeCoverPage,
            data.AnimeTitle,
            data.AnimeDesc,
            data.AnimeLanguage,
            data.AnimeEpisode,
            data.AnimeSeason,
            data.AnimeGenre,
            data.AnimeEpisodeLength,
            data.AnimeDate,
            data.AnimeIMDB,
            data.AnimeStatus,
            data.AnimeTags,
            AID,
          ],
          (err, result2) => {
            if (err) console.log(err);
            else {
              console.log("anime Updated!");
            }
          }
        );
        console.log(result1[0]);
      } else {
        console.log("Anime has no episodes..");
      }
    }
  });
};

module.exports = { updateEpisode, updateAnime };
