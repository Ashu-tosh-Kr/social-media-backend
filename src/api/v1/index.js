const Router = require("express").Router;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
module.exports = function () {
  const router = Router();
  router.use("/auth", authRouter);
  router.use("/users", userRouter);
  router.use("/posts", postRouter);
  return router;
};
