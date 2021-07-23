const Router = require("express").Router;
module.exports = function () {
  const router = Router();
  router.get("/test", (req, res) => res.json("hello"));
  return router;
};
