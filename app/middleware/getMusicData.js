const ffmpeg = require("fluent-ffmpeg");
const createError = require("http-errors");
async function getMusicData(req, res, next) {
  try {
    console.log("s");
    req.body.size = req.file.size;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = getMusicData;
