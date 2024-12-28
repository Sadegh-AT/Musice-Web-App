const { musicRoutes } = require("./music.routes");
const router = require("express").Router();

router.use("/music", musicRoutes);

module.exports = {
  AllRoutes: router,
};
