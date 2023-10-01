const multer = require("multer");
const path = require("path");
//make storage defination. There is a uploads directory in the root folder every upload in that folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve("./usr/app/public"));
  },
  filename: function(req, file, cb) {
    console.log("file", cb);

    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype, "file mimetype");
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    req.fileValidationError =
      "Invalid file type, only JPEG and PNG is allowed!";
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const uploadFile = multer({ fileFilter, storage: storage });
let upload = {};

//the function using to upload single file.
upload.oneFile = function(fileName) {
  return uploadFile.single(fileName);
};

// the function using to upload multiple file at a time. You can add an array with the same name if you want to upload multiple file at a time.
upload.multiFile = function(fileName) {
  return uploadFile.array(fileName, 30);
};
module.exports = upload;
