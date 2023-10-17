const multer = require("multer");

const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

function createRoute(req) {
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "music"
  );
  req.body.fileUploadPath = path.join("uploads", "music");
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const fileFilter = (req, file, cb) => {
  // Allowed audio file types
  const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/x-m4a"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      createError.BadRequest(
        "Invalid file type. Only MP3, WAV, and M4A files are allowed."
      ),
      false
    );
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const ext = path.extname(file.originalname);

    const basename = path.parse(file.originalname).name;
    const fileName = `${basename}-${year}-${month}-${day}-${new Date().getTime()}${ext}`;
    req.body.fileName = fileName;
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage, fileFilter });

module.exports = uploadFile;
