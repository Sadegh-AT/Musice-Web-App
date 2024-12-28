const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true, default: "00:00" },
  size: { type: Number, required: true, default: 0 },
  url: { type: String, required: true, default: "" },
  url: { type: String, required: true, default: "" },
});

const MusicModel = mongoose.model("music", Schema);

module.exports = {
  MusicModel,
};
