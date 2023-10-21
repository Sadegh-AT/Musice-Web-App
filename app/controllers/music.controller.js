const createError = require("http-errors");
const path = require("path");
const fs = require("fs");
const { MusicModel } = require("../model/music.model");

async function createMusic(req, res, next) {
  try {
    const { title, fileUploadPath, fileName, time, size } = req.body;
    await MusicModel.create({
      title,
      size,
      musicPath: path.join(fileUploadPath, fileName),
    });
    res.send({ message: "Added music 👍" });
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
    if (!range) throw createError.NotFound("Range not provided");

    const music = await MusicModel.findById({ _id: id });
    const musicPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      music.musicPath
    );
    let [start, end] = range.replace(/bytes=/, "").split("-");
    const chunk = 10 ** 6; // 1mb
    start = Number(start);
    end = end ? Number(end) : Math.min();
    const readStream = fs.createReadStream(musicPath);

    readStream.pipe(res);
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
