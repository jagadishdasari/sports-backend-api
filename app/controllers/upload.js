const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./app/img"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({
  // console.log('object');
  storage: fileStorage,
});

module.exports = uploadImage;
