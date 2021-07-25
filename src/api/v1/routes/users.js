const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ msg: "success", data: user, err: false });
    } catch (err) {
      res.status(500).json({ msg: err.message, data: null, err: true });
    }
  } else {
    res
      .status(403)
      .json({ msg: "You can update only your account", data: null, err: true });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      res
        .status(200)
        .json({ msg: "successfully deleted", data: user, err: false });
    } catch (err) {
      res.status(500).json({ msg: err.message, data: null, err: true });
    }
  } else {
    res
      .status(403)
      .json({ msg: "You can delete only your account", data: null, err: true });
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...rest } = user._doc;
    res.status(200).json({ msg: "success", data: rest, err: false });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: req.body.userId } });

        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ msg: "success", data: null, err: false });
      } else {
        res
          .status(403)
          .json({ msg: "Already following", data: null, err: true });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message, data: null, err: true });
    }
  } else {
    res
      .status(403)
      .json({ msg: "You can't follow yourself", data: null, err: true });
  }
});
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });

        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ msg: "success", data: null, err: false });
      } else {
        res
          .status(403)
          .json({ msg: "You don't follow this user", data: null, err: true });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message, data: null, err: true });
    }
  } else {
    res
      .status(403)
      .json({ msg: "You can't unfollow yourself", data: null, err: true });
  }
});
module.exports = router;
