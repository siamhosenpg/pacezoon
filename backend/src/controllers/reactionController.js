import Reaction from "../models/reactionModel.js";

// 🟢 Create or Update Reaction
export const createOrUpdateReaction = async (req, res) => {
  try {
    const { postId, reaction } = req.body;
    const userId = req.user.id; // 🔥 Always from auth middleware

    if (!postId || !reaction) {
      return res
        .status(400)
        .json({ message: "postId & reaction are required" });
    }

    // আগের reaction আছে কিনা খুঁজো
    let existing = await Reaction.findOne({ userId, postId });

    if (existing) {
      // Update previous reaction
      existing.reaction = reaction;
      await existing.save();

      return res.status(200).json({
        message: "Reaction updated successfully",
        reaction: existing,
      });
    }

    // New reaction create
    const newReaction = await Reaction.create({
      userId,
      postId,
      reaction,
    });

    return res.status(201).json({
      message: "Reaction added successfully",
      reaction: newReaction,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating/updating reaction",
      error: err.message,
    });
  }
};

// 🔴 Delete Reaction
export const deleteReaction = async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 Always logged in user
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const deleted = await Reaction.findOneAndDelete({ userId, postId });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "No reaction found for this post" });
    }

    return res.status(200).json({
      message: "Reaction removed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting reaction",
      error: err.message,
    });
  }
};

// 🟣 Get All Reactions of a Post
export const getReactionsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const reactions = await Reaction.find({ postId }).populate(
      "userId",
      "name username profileImage"
    );

    return res.status(200).json({
      count: reactions.length,
      reactions,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching reactions",
      error: err.message,
    });
  }
};

// 🟡 Get Reaction Count Only
export const getReactionCount = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    // শুধু count দরকার → fastest & lightweight
    const count = await Reaction.countDocuments({ postId });

    return res.status(200).json({
      success: true,
      postId,
      count,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching reaction count",
      error: err.message,
    });
  }
};
