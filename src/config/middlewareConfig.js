const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("common"));
  app.use(cookieParser());
  app.use(cors());
};
