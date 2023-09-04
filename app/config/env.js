const constants = require("./constants");
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case "local":
      return {
        MONGODB: constants.MONGODB.LOCALHOST.URL,
        PORT: 3001,
        JWTOKEN: constants.JWTOKENLOCAL,
        EXPIRY: constants.key.tokenExpiry,
        BASEURL: constants.BASE_URL_LOCAL
      };
    case "dev":
      return {
        MONGODB: constants.MONGODB.DEV.URL,
        PORT: 3001,
        JWTOKEN: constants.JWTOKENDEV,
        EXPIRY: constants.key.tokenExpiry,
        BASEURL: constants.BASE_URL_DEV
      };
    case "stg":
      return {
        MONGODB: constants.MONGODB.STAGING.URL,
        PORT: 3001,
        JWTOKEN: constants.JWTOKENDEV,
        EXPIRY: constants.key.tokenExpiry,
        BASEURL: constants.BASE_URL_STG
      };
    default:
      return {
        MONGODB: constants.MONGODB.DEV.URL,
        PORT: 3001,
        JWTOKEN: constants.JWTOKENDEV,
        EXPIRY: constants.key.tokenExpiry,
        BASEURL: constants.BASE_URL_LOCAL
      };
  }
};
