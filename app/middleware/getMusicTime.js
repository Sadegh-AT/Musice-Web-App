const ffmpeg = require("fluent-ffmpeg");
const createError = require("http-errors");
async function getMusicTime(req, res, next) {
  try {
    ffmpeg.setFfprobePath(req.file.path);
    ffmpeg.ffprobe(req.file.path, (error, metadata) => {
      if (!error) {
        const durationInSeconds = metadata.format.duration;
        req.body.time = durationInSeconds;
        next();
      } else {
        throw createError.InternalServerError(error.message);
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getMusicTime;
