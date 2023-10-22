const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
const { MusicModel } = require("../model/music.model");

async function createMusic(req, res, next) {
  try {
    const { title, fileUploadPath, fileName, time, size } = req.body;
    console.log(title, fileUploadPath, fileName, time, size);
    await MusicModel.create({
      title,
      size,
      musicPath: path.join(fileUploadPath, fileName),
    });
    // res.redirect("/dashboard");
    // // res.send({ message: "Added music 👍" });
  } catch (error) {
    next(error);
  }
}
async function getAllMusic(req, res, next) {
  try {
    const musics = await MusicModel.find({}, { __v: 0 });
    res.send(musics);
  } catch (error) {
    next(error);
  }
}
async function editMusic(req, res, next) {}

async function streamMusic(req, res, next) {
  try {
    const { id } = req.params;
    const range = req.headers.range;
    const music = await MusicModel.findById({ _id: id });
    const musicPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      music.musicPath
    );
    const { size } = fs.statSync(musicPath);
    const readStream = fs.createReadStream(musicPath);
    if (range) {
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size - 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": start - end + 1,
        "Content-Type": "audio/mpeg",
      });
      fs.createReadStream(musicPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": size,
        "Content-Type": "audio/mpeg",
      });
      readStream.pipe(res);
    }
  } catch (error) {
    next(error);
  }
}
async function deleteMusic(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) throw createError.BadRequest("Music not Found");
    const music = await MusicModel.findOneAndDelete({ _id: id });
    let musicPath = path.join(__dirname, "..", "..", "public", music.musicPath);
    const s = fs.unlinkSync(musicPath);
    res.send({ message: "Delete Successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMusic,
  getAllMusic,
  editMusic,
  streamMusic,
  deleteMusic,
};
