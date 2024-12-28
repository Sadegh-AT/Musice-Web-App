const { MusicRoutes } = require("../modules/music/music.routes");

const router = require("express").Router();

router.use("/music", MusicRoutes);
router.get("", (req, res) => {
  res.send({ message: "hi" });
});
module.exports = {
  AllRoutes: router,
};
