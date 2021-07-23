const express = require("express");
const config = require("./config");
const routes = require("./api/v1");

async function startServer() {
  const app = express();
  await config(app);
  app.use("/api/v1", routes());
  app.listen(8800, () => console.log("Server started"));
}

startServer();
