const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pjson = require("./package.json");
const { NODE_ENV } = process.env;
const logger = require("./logger");
const test = require("./routes/test");
// Set path to variables file based on if production
const dotEnvPath =
  NODE_ENV === "production" ? ".env" : NODE_ENV && `.env.${NODE_ENV}`;

// Reference variables file  Deployment test
require("dotenv").config({
  path: dotEnvPath,
});

// Static file service
const cors = require("cors");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.all("*", (req, res, next) => {
  res.header("Slow-Server-Version", pjson.version);
  next();
});

test(app);
const http = require("http").Server(app);
const port = ("port", process.env.PORT || 8553);

const server = http.listen(port, () => {
  logger.info(
    `😁  ${pjson.name} running → PORT ${server.address().port}  ${NODE_ENV} ${
      pjson.version
    }`
  );
});
server.timeout = 120000;
