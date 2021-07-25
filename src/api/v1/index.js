const Router = require("express").Router;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
module.exports = function () {
  const router = Router();
  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  return router;
};
