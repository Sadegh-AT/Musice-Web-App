const {
  createMusic,
  editMusic,
  getAllMusic,
  streamMusic,
  deleteMusic,
} = require("../controllers/music.controller");
const getMusicData = require("../middleware/getMusicData");

const uploadFile = require("../utils/multer");

const router = require("express").Router();

router.get("/", getAllMusic);
router.get("/stream/:id", streamMusic);
router.post("/create", uploadFile.single("music"), getMusicData, createMusic);
router.put("/edit", editMusic);
router.delete("/delete/:id", deleteMusic);

module.exports = {
  musicRoutes: router,
};
