import mongoose from "mongoose";
import Post from "../models/postmodel.js";

// 🟢 Get all posts with user info
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userid", "name username profileImage") // populate user info
      .sort({ createdAt: -1 }) // 🔥 newest posts first
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
      .populate("userid", "name  username bio profileImage")
      .exec();

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get all posts by specific userid
export const getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userid;

    const posts = await Post.find({ userid: userId })
      .populate("userid", "name username bio profileImage")
      .exec();

    return res.status(200).json({
      posts: posts || [],
      count: posts.length || 0,
      message: posts.length === 0 ? "No posts found" : undefined,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
// 🟢 Create new post (login user required)

// 🟢 Create new post (login required)
export const createPost = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Login required to create post" });
    }

    const { caption, privacy, location, tags, mentions } = req.body;

    const files = req.files || []; // multer gives array
    let mediaUrls = [];
    let contentType = "text";

    // 🧠 If media exists
    if (files.length > 0) {
      const images = files.filter((file) => file.mimetype.startsWith("image"));
      const videos = files.filter((file) => file.mimetype.startsWith("video"));

      // ❌ image + video together not allowed
      if (images.length > 0 && videos.length > 0) {
        return res.status(400).json({
          message: "You can upload either images or a video, not both",
        });
      }

      // 🎥 Only one video allowed
      if (videos.length > 1) {
        return res.status(400).json({
          message: "Only one video is allowed",
        });
      }

      // 🖼 Multiple images allowed
      if (images.length > 0) {
        contentType = "image";
        mediaUrls = images.map((file) => file.path); // Cloudinary URLs
      }

      // 🎥 Single video
      if (videos.length === 1) {
        contentType = "video";
        mediaUrls = [videos[0].path];
      }
    }

    // ✅ Generate random postid (7–8 digit safe)
    const randomPostId = Math.floor(1000000 + Math.random() * 9000000);

    const newPost = await Post.create({
      postid: randomPostId,
      userid: req.user.id,
      content: {
        caption,
        media: mediaUrls,
        type: contentType,
        location,
        tags,
        mentions,
      },
      privacy: privacy || "public",
    });

    await newPost.populate("userid", "name username profileImage");

    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 🟢 Update post by _id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Owner check
    if (req.user._id.toString() !== post.userid.toString()) {
      return res
        .status(403)
        .json({ message: "You can only edit your own posts" });
    }

    Object.assign(post, req.body, { updatedAt: new Date() });

    const updatedPost = await post.save();
    await updatedPost.populate("userid", "name username profileImage");

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🟢 Delete post by _id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Owner check
    if (req.user.id.toString() !== post.userid.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Get single post by MongoDB _id with user info
export const getPostByMongoId = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id)
      .populate("userid", "name username bio profileImage")
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error("Get post by _id error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
