const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    //create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(200).json({ msg: "success", err: false, data: user });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ msg: "success", data: user, err: false });
  } catch (err) {
    res.status(404).json({ msg: err.message, data: null, err: true });
  }
});
module.exports = router;
