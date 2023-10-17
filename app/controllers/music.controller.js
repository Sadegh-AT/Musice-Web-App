const createError = require("http-errors");
const path = require("path");
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

module.exports = {
  createMusic,
  getAllMusic,
  editMusic,
};
