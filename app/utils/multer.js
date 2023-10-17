const multer = require("multer");

const path = require("path");
const fs = require("fs");

function createRoute(req) {
  const directory = path.join(__dirname, "..", "..", "uploads", "music");
  req.body.fileUploadPath = path.join("uploads", "music");
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

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

const uploadFile = multer({ storage });

module.exports = uploadFile;
