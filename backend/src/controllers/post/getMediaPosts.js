import Post from "../../models/postmodel.js";

/**
 * 🟢 Get all IMAGE or VIDEO posts (Mixed Feed)
 * GET /api/posts/media
 */
export const getMediaPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      privacy: "public",
      "content.type": { $in: ["image", "video"] },
    })
      .populate("userid", "name userid profileImage")
      .sort({ createdAt: -1 }) // newest first
      .exec();

    return res.status(200).json({
      success: true,
      posts: posts || [],
      count: posts.length,
      message: posts.length === 0 ? "No media posts found" : undefined,
    });
  } catch (error) {
    console.error("getMediaPosts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * 🟢 Get IMAGE or VIDEO posts by specific user
 * GET /api/posts/media/:userid
 */
export const getMediaPostsByUser = async (req, res) => {
  try {
    const { userid } = req.params;

    const posts = await Post.find({
      userid,
      privacy: "public",
      "media.type": { $in: ["image", "video"] },
    })
      .populate("userid", "name userid profileImage")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      posts: posts || [],
      count: posts.length,
      message: posts.length === 0 ? "No media posts found" : undefined,
    });
  } catch (error) {
    console.error("getMediaPostsByUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
