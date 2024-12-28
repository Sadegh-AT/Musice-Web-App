const autoBind = require("auto-bind");

const { responseFormatter } = require("../../utils/respons-formater");

const createHttpError = require("http-errors");
const musicService = require("./music.service");

class MusicController {
  constructor() {
    autoBind(this);
  }

  async getAll(req, res, next) {
    try {
      const musics = await musicService.getAll();

      return res.json(
        responseFormatter("All Music Tracks", 200, musics, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
  async addTrack(req, res, next) {
    try {
      const musics = await musicService.addTrack();

      return res.json(
        responseFormatter("All Music Tracks", 200, musics, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MusicController();
