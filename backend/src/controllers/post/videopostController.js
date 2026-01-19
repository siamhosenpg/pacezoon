import Post from "../../models/postmodel.js";

export const getVideoPosts = async (req, res) => {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 6, 1);
    const { cursor } = req.query;

    const query = {
      "content.type": "video",
      privacy: "public",
    };

    // 🔹 cursor থাকলে older posts আনবে
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const videoPosts = await Post.find(query)
      .populate("userid", "name userid badges profileImage gender")
      .sort({ createdAt: -1 })
      .limit(limit + 1); // 👈 extra one to detect next page

    const hasMore = videoPosts.length > limit;

    if (hasMore) videoPosts.pop(); // extra remove

    return res.status(200).json({
      posts: videoPosts,
      nextCursor:
        videoPosts.length > 0
          ? videoPosts[videoPosts.length - 1].createdAt.toISOString()
          : null,
      hasMore,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getVideoPostsByUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const limit = Math.max(parseInt(req.query.limit) || 6, 1);
    const { cursor } = req.query;

    const query = {
      userid,
      "content.type": "video",
    };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const videoPosts = await Post.find(query)
      .populate("userid", "name userid badges profileImage gender")
      .sort({ createdAt: -1 })
      .limit(limit + 1);

    const hasMore = videoPosts.length > limit;
    if (hasMore) videoPosts.pop();

    return res.status(200).json({
      posts: videoPosts,
      nextCursor:
        videoPosts.length > 0
          ? videoPosts[videoPosts.length - 1].createdAt
          : null,
      hasMore,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
