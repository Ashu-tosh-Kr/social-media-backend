const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json({ msg: "success", data: newPost, err: false });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ msg: "success", data: post, err: false });
    } else {
      res
        .status(403)
        .json({ msg: "you can update only your post", data: null, err: true });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ msg: "success", data: post, err: false });
    } else {
      res
        .status(403)
        .json({ msg: "you can delete only your post", data: null, err: true });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ msg: "liked", data: post, err: false });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(403).json({ msg: "dislike", data: null, err: true });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ msg: "success", data: post, err: false });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});

//get timeline post
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json({
      msg: "success",
      data: userPosts.concat(...friendPosts),
      err: false,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message, data: null, err: true });
  }
});
module.exports = router;
