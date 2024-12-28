const musicController = require("./music.controller");

const router = require("express").Router();

router.get("/", musicController.getAll);
router.post("/create", musicController.addTrack);
module.exports = {
  MusicRoutes: router,
};
