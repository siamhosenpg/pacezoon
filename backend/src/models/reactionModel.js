import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    reaction: {
      type: String,
      enum: ["like", "love", "haha", "wow", "sad", "angry", "care"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

// Prevent same user reacting twice on same post
reactionSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Optimize fast reaction counting
reactionSchema.index({ postId: 1, reaction: 1 });

const Reaction = mongoose.model("Reaction", reactionSchema);

export default Reaction;
