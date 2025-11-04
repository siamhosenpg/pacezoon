import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    content: {
      caption: { type: String, trim: true },
      media: [
        {
          url: { type: String, required: true },
          type: {
            type: String,
            enum: ["image", "video", "reel"],
            default: "image",
          },
        },
      ],
      location: { type: String },
      tags: [{ type: String }],
      mentions: [{ type: String }],
    },

    likesid: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentsid: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    privacy: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

export default postSchema;
