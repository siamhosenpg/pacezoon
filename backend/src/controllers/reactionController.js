import Reaction from "../models/reactionModel.js";

// 🟢 Create or Update Reaction
export const createOrUpdateReaction = async (req, res) => {
  try {
    const { postId, reaction } = req.body;
    const userId = req.user.id; // auth middleware থেকে আসবে

    // আগেই reaction দেওয়া আছে কিনা খুঁজছি
    let existing = await Reaction.findOne({ userId, postId });

    if (existing) {
      // যদি থাকে—তাহলে update
      existing.reaction = reaction;
      await existing.save();

      return res.status(200).json({
        message: "Reaction updated successfully",
        reaction: existing,
      });
    }

    // নতুন reaction create
    const newReaction = await Reaction.create({
      userId,
      postId,
      reaction,
    });

    res.status(201).json({
      message: "Reaction added successfully",
      reaction: newReaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating/updating reaction",
      error: err.message,
    });
  }
};

// 🔴 Delete Reaction
export const deleteReaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const deleted = await Reaction.findOneAndDelete({ userId, postId });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "No reaction found for this post" });
    }

    res.status(200).json({
      message: "Reaction removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting reaction",
      error: err.message,
    });
  }
};

// 🟣 Get All Reactions of a Post
export const getReactionsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const reactions = await Reaction.find({ postId }).populate(
      "userId",
      "name username profileImage"
    );

    res.status(200).json({
      count: reactions.length,
      reactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching reactions",
      error: err.message,
    });
  }
};
