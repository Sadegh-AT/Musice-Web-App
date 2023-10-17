const createError = require("http-errors");
const path = require("path");
const { MusicModel } = require("../model/music.model");
async function createMusic(req, res, next) {
  try {
    const { title, fileUploadPath, fileName, time } = req.body;
    await MusicModel.create({
      title,
      musicPath: path.join(fileUploadPath, fileName),
    });
    res.send({ message: "Added music 👍" });
  } catch (error) {
    next(error);
  }
}
async function getAllMusic(req, res, next) {}
async function editMusic(req, res, next) {}

module.exports = {
  createMusic,
  getAllMusic,
  editMusic,
};
