const Promise = require("bluebird-extra");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const unlink = Promise.promisify(fs.unlink, fs);
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_USER_SECRET_KEY,
  region: process.env.AWS_REGION
});
var s3 = new AWS.S3();
s3Upload = {};

//using to upload file or any document to s3 server. This function using always after upload file in uploads folder using *oneFile or multiFile* in the index.js
s3Upload.uploadSingleMediaToS3 = function() {
  return function(req, res, next) {
    var files = s3Upload.fetchFilesFromReq(req);

    if (!files) {
      return next();
    }

    return new Promise(function(resolve, reject) {
      var file = files[0];
      let key = `image/${new Date().getTime()}_${file.filename}`;
      console.log(key, "key----------");
      console.log(file);
      var params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: fs.createReadStream(file.path),
        ACL: "public-read",
        ContentType: file.mimetype
      };
      s3.upload(params, function(err, data) {
        if (err) {
          console.log("error", err);
        }
        if (data) {
          console.log("data", data);
          req.body.location = data.Location;
        }
        s3Upload.deleteFiles(_.map(files, "path"));
        next();
      });
    });
  };
};

// this function add *file object* in the req variable after upload file.
s3Upload.fetchFilesFromReq = function(req) {
  if (req.file) {
    return [req.file];
  } else if (req.files) {
    return req.files;
  } else {
    //No Data
  }
};

// this function using to delete file after upload file at the *s3 server*
s3Upload.deleteFiles = function(filePathList) {
  var promiseArray = [];

  _.each(_.uniq(filePathList), function(path) {
    promiseArray.push(unlink(path));
  });

  Promise.all(promiseArray)
    .then(function() {
      console.log("All Files Deleted Successfully");
    })
    .catch(function(err) {
      console.log(err);
    });
};

module.exports = s3Upload;
