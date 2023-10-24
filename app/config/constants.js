const dotenv = require("dotenv");
dotenv.config();

const userName = process.env.MONGOUSERNAME;
const password = process.env.PASSWORD;

const globalConstants = {
  EMAIL: "test@gmail",
  JWTOKENLOCAL: "fax42c62-g215-4dc1-ad2d-sa1f32kk1w22",
  JWTOKENDEV: "fcv42f62-g465-4dc1-ad2c-sa1f27kk1w43",
  JWTOKENSTAGING: "fcv42f62-g465-4dc1-ad2c-sa1f27kk1w43",
  JWTOKENLIVE: "asd42e62-g465-4bc1-ae2c-da1f27kk3a20",
  pageLimit: 20,
  key: {
    privateKey: "c3f42e68-b461-4bc1-ae2c-da9f27ee3a20",
    tokenExpiry: 24 //1 DAY
  },
  BASE_URL_LOCAL: "http://16.170.162.43/",
  BASE_URL_DEV: "http://16.170.162.43/",
  BASE_URL_STG: "",
  BASE_URL_LIVE: "https://kredangan.com",

  MONGODB: {
    LOCALHOST: {
      URL: "mongodb://localhost:27017"
    },
    DEV: {
      URL:
        "mongodb+srv://admin:Hari%404858@cluster0.nnkx8eo.mongodb.net/sports?retryWrites=true&w=majority"
    },
    LIVE: {
      URL: `mongodb+srv://${userName}:${password}@cluster0.mydbx0m.mongodb.net/kredangan?retryWrites=true&w=majority`
    },
    STAGING: {
      URL: "mongodb://localhost:27017"
    }
  }
};

module.exports = globalConstants;
