const autoBind = require("auto-bind");
const { MusicModel } = require("./music.model");

class MusicService {
  constructor() {
    autoBind(this);
  }

  async getAll() {
    try {
      return await MusicModel.find();
    } catch (error) {
      throw error;
    }
  }
  async addTrack(payload) {
    try {
      return await MusicModel.find();
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new MusicService();
