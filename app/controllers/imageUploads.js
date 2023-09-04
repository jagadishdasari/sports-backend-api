const output = require("../output/index");
const env = require("../config/env")();
async function uploadfile(req, res) {
  try {
    if (!req.file) throw 21;
    let result = `${env.BASEURL}img/${req.file.filename}`;
    return output.makeSuccessResponseWithMessage(res, 2, 200, result);
  } catch (error) {
    return output.makeErrorResponse(res, error);
  }
}

module.exports = {
  uploadfile: uploadfile
};
