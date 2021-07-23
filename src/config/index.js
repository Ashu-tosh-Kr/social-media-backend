require("dotenv").config();
const dbConfig = require("./dbConfig");
const middlewareConfig = require("./middlewareConfig");

module.exports = async function (app) {
  await dbConfig();
  middlewareConfig(app);
};
