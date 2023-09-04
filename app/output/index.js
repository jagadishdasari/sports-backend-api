const messages = require("../config/messages");

errorMessages = require("./message");

let output = {};

output.makeErrorResponse = function(res, errorCode, err) {
  let statusCode = 400;
  let outputData = output.makeErrorResponseText(res, errorCode, err);
  if (outputData.status) {
    statusCode = outputData.status;
  }
  res.status(statusCode).send(outputData);
};

output.makeErrorResponseWithData = function(res, errorCode, data) {
  var makeErrorResponse = {
    status: _makeStatusCode(errorCode),
    error: { errorCode: errorCode, message: errorMessages.error[errorCode] },
    time: new Date(),
    output: data,
  };
  res.send(makeErrorResponse);
};

output.makeSuccessResponse = function(res, data) {
  var makeSuccessResponse = { status: 200, output: data, time: new Date() };
  res.send(makeSuccessResponse);
};

output.makeSuccessResponseWithMessage = async function(
  res,
  messageCode,
  statusCode,
  data
) {
  var makeSuccessResponse = {
    status: statusCode,
    message: errorMessages.error[messageCode],
    output: data,
    time: new Date(),
  };
  res.send(makeSuccessResponse);
};

output.makeErrorResponseText = function(res, errorCode, err) {
  if (errorCode.error) {
    makeError = {
      status: _makeStatusCode(errorCode),
      error: errorCode.error,
      realMessage: err,
      time: new Date(),
    };
  } else if (errorCode.message) {
    makeError = {
      status: _makeStatusCode(errorCode),
      error: {
        errorCode: 1000,
        message: errorCode.message,
      },
      time: new Date(),
    };
  } else {
    makeError = {
      status: _makeStatusCode(errorCode),
      error: {
        errorCode: errorCode,
        message: errorMessages.error[errorCode],
      },
      time: new Date(),
    };
  }
  return makeError;
};

_makeStatusCode = function(errorCode) {
  let statusCode = 400;
  if (errorCode == 5 || errorCode == 9) {
    //this is for authToken validation code
    statusCode = 401;
  }

  if (errorCode == 1500 || errorCode == 1002) {
    statusCode = 403;
  }

  if (errorCode == 56) {
    //Account blocked
    statusCode = 500;
  }
  return statusCode;
};

module.exports = output;
