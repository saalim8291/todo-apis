const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(__dirname, "../uploads", uniqueFileName);
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
