import Post from "../../models/postmodel.js";

// 🟢 Get all VIDEO posts
export const getVideoPosts = async (req, res) => {
  try {
    const videoPosts = await Post.find({
      "content.type": "video", // 🔥 only video posts
      privacy: "public", // চাইলে বাদ দিতে পারো
    })
      .populate("userid", "name userid profileImage")
      .sort({ createdAt: -1 }) // newest first
      .exec();

    return res.status(200).json({
      posts: videoPosts || [],
      count: videoPosts.length || 0,
      message: videoPosts.length === 0 ? "No video posts found" : undefined,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get VIDEO posts by specific user
export const getVideoPostsByUser = async (req, res) => {
  try {
    const { userid } = req.params;

    const videoPosts = await Post.find({
      userid,
      "media.type": "video",
    })
      .populate("userid", "name userid profileImage")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      posts: videoPosts || [],
      count: videoPosts.length || 0,
      message: videoPosts.length === 0 ? "No video posts found" : undefined,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
