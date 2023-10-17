const {
  createMusic,
  editMusic,
  getAllMusic,
} = require("../controllers/music.controller");
const getMusicData = require("../middleware/getMusicData");

const uploadFile = require("../utils/multer");

const router = require("express").Router();

router.get("/", getAllMusic);
router.post("/create", uploadFile.single("music"),getMusicData, createMusic);
router.put("/edit", editMusic);

module.exports = {
  musicRoutes: router,
};
