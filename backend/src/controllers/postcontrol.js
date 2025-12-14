import Post from "../models/postmodel.js";

// 🟢 Get all posts with user info
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userid", "name userid profileImage") // populate user info
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
      .populate("userid", "name userid bio profileImage")
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
      .populate("userid", "name userid bio profileImage")
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
export const createPost = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Login required to create post" });
    }

    // ✅ Generate random postid (7 digit number)
    const randomPostId = Math.floor(10000500 + Math.random() * 90600000); // 1000000 - 9999999

    const newPost = new Post({
      postid: randomPostId,
      userid: req.user.id, // Logged-in user id automatically
      content: req.body.content,
      privacy: req.body.privacy || "public",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await newPost.save();

    // Populate user info in response
    await savedPost.populate("userid", "name userid profileImage");

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    await updatedPost.populate("userid", "name userid profileImage");

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
