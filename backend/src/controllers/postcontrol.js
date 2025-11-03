const mongoose = require("mongoose");
const postSchema = require("../models/postmodel");
const posts = mongoose.model("posts", postSchema);

exports.getPosts = async (req, res) => {
  try {
    const post = await posts.find();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
