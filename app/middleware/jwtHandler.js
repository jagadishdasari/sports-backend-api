const Jwt = require("jsonwebtoken");
const env = require("../config/env")();

const privateKey = env.JWTOKEN;

let jwtService = {};

jwtService.signAccessToken = (userDetails) => {
  try {
    let data = {
      authType: userDetails.authType,
      userId: userDetails.id
    };
    let accessToken = Jwt.sign(data, privateKey);
    return accessToken;
  } catch (error) {
    throw 3;
  }
};

jwtService.verifyAccessToken = async function (accessToken) {
  try {
    let payload = Jwt.verify(accessToken, privateKey);
    return payload;
  } catch (error) {
    throw 5;
  }
};

module.exports = jwtService;
