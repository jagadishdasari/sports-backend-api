const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./app/database/dbConnection");
const responseTime = require("response-time");
const path = require("path");
const env = require("./app/config/env")();

const app = express();

dotenv.config();

connectDB();

app.use(cors());

app.use(logger("dev"));
app.use(responseTime());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route

app.get("/", (req, res) => {
  return res.status(200).json("Welcome to App");
});

// load routes
app.use("/api/player", require("./app/routes/playerRoutes"));
app.use("/api/academy", require("./app/routes/academyRoutes"));
app.use("/api/admin", require("./app/routes/adminRoutes"));

app.use("/img", express.static(path.join(__dirname, "app/img")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.status(404).end("Not found");
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

// set the listen port
const PORT = env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is running on http:localhost:${PORT}`);
});
