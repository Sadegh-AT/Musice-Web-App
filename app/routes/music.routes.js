const {
  createMusic,
  editMusic,
  getAllMusic,
} = require("../controllers/music.controller");
const getMusicTime = require("../middleware/getMusicTime");
const uploadFile = require("../utils/multer");

const router = require("express").Router();

router.get("/", getAllMusic);
router.post("/create", uploadFile.single("music"), createMusic);
router.put("/edit", editMusic);

module.exports = {
  musicRoutes: router,
};
