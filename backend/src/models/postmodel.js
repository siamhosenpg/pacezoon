// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postid: { type: Number },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      location: { type: String, trim: true },
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

module.exports = postSchema;
