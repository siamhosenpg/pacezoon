import mongoose from "mongoose";
const { Schema } = mongoose;

// =============================
// 🔹 Sub-schemas (nested parts)
// =============================

// Login history schema
const LoginHistorySchema = new Schema(
  {
    ip: String,
    device: String,
    location: String,
    loginAt: Date,
  },
  { _id: false }
);

// Notifications & Privacy inside settings
const SettingsSchema = new Schema(
  {
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
    notifications: {
      likes: { type: Boolean, default: true },
      comments: { type: Boolean, default: true },
      follows: { type: Boolean, default: true },
      mentions: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
    },
    privacy: {
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      allowTagging: { type: Boolean, default: true },
      allowMessagesFrom: {
        type: String,
        enum: ["everyone", "followers", "none"],
        default: "followers",
      },
    },
  },
  { _id: false }
);

// Security schema
const SecuritySchema = new Schema(
  {
    twoFactorAuth: { type: Boolean, default: false },
    lastPasswordChange: { type: Date },
    loginHistory: [LoginHistorySchema],
  },
  { _id: false }
);

// =============================
// 🔹 Main User Schema
// =============================
const UserSchema = new Schema(
  {
    userid: { type: Number, unique: true, index: true },
    username: { type: String, required: true, unique: true, trim: true },
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    bio: { type: String, trim: true, maxlength: 300 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    dateOfBirth: { type: Date },
    location: { type: String, trim: true },
    website: { type: String, trim: true },
    phone: { type: String, trim: true },

    followers: [{ type: Number }],
    following: [{ type: Number }],
    posts: [{ type: Number }],
    savedPosts: [{ type: Number }],
    blockedUsers: [{ type: Number }],

    accountType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    verified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    settings: { type: SettingsSchema, default: {} },
    security: { type: SecuritySchema, default: {} },

    preferences: {
      contentVisibility: {
        type: String,
        enum: ["everyone", "friends_only", "private"],
        default: "everyone",
      },
      autoPlayVideos: { type: Boolean, default: true },
    },

    badges: [{ type: String }],

    activityStats: {
      totalPosts: { type: Number, default: 0 },
      totalLikesGiven: { type: Number, default: 0 },
      totalLikesReceived: { type: Number, default: 0 },
      totalComments: { type: Number, default: 0 },
      totalFollowers: { type: Number, default: 0 },
      totalFollowing: { type: Number, default: 0 },
    },

    joinedAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ "settings.language": 1 });

// =============================
// 🔹 Model Export
// =============================

export default UserSchema;
