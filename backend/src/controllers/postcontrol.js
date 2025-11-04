import mongoose from "mongoose";
import postSchema from "../models/postmodel.js";

import UserSchema from "../models/usermodel.js";

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", postSchema);

// 🟢 Get all posts with user info
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userid", "fname lname profileImage") // userid কে populate করছো, শুধু name এবং profileImage আনবে
      .exec();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get single post by postid with user info
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ postid: req.params.postid })
      .populate("userid", "fname lname profileImage") // populate
      .exec();

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Create new post
export const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      postid: req.body.postid,
      userid: req.body.userid,
      content: req.body.content,
      likesid: req.body.likesid || [],
      commentsid: req.body.commentsid || [],
      shares: req.body.shares || [],
      privacy: req.body.privacy || "public",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 Update post (edit)
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { postid: Number(req.params.postid) },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 Delete post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      postid: Number(req.params.postid),
    });
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
