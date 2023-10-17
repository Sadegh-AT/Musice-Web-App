const router = require("express").Router();

router.get("/");
router.post("/create");
router.put("/edit");

module.exports = {
  musicRoutes: router,
};
