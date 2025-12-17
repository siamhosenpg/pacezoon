import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postid: {
      type: Number,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    content: {
      caption: { type: String, trim: true },
      media: [{ type: String, required: true }],
      type: {
        type: String,
        enum: ["image", "video", "text"],
        default: "text",
      },
      location: { type: String },
      tags: [{ type: String }],
      mentions: [{ type: String }],
    },

    privacy: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

postSchema.index({
  "content.caption": "text",
});
// ✅ MUST export model
const Post = mongoose.model("Post", postSchema);
export default Post;
