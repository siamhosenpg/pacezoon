import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import Follow from "../models/followModel.js";

/**
 * ✅ Get all users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * ✅ Get single user by userid
 */
export const getUserById = async (req, res) => {
  try {
    const userid = Number(req.params.userid);
    const user = await User.findOne({ userid }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

///** ✅ Update user
// */
export const updateUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid); // numeric userid
    const loggedInUserId = req.user.id; // MongoDB _id (string)

    // Step 1: First find user by numeric userid
    const user = await User.findOne({ userid });
    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Compare user._id with loggedIn user id
    if (user._id.toString() !== loggedInUserId) {
      return res.status(403).json({
        message: "You can only edit your own profile",
      });
    }

    // Allowed fields
    const allowedFields = [
      "name",
      "username",
      "bio",
      "profileImage",
      "coverImage",
      "aboutText",
      "gender",
      "work",
      "location",
      "education",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    // Password handle
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.password, salt);
    }

    // Step 3: Update with MongoDB _id
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot update user", error: err.message });
  }
};

/**
 * ✅ Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid);

    const deletedUser = await User.findOneAndDelete({ userid });

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cannot delete user", error: err.message });
  }
};

/**
 * ✅ Get user by username
 */
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const user = await User.findOne({ username }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * 🟦 Suggestion Accounts
 * → Those users whom logged-in user does NOT follow
 * → Exclude logged-in user himself
 */
export const getSuggestedUsers = async (req, res) => {
  try {
    const loggedUserId = req.user.id; // MongoDB _id (string)

    if (!loggedUserId) {
      return res.status(401).json({ message: "Login required" });
    }

    // 1️⃣ Find all users I already follow
    const followingList = await Follow.find({ follower: loggedUserId }).select(
      "following"
    );

    const followingIds = followingList.map((item) => item.following.toString());

    // 2️⃣ Add my own id (so I am not suggested)
    followingIds.push(loggedUserId);

    // 3️⃣ Fetch all users except my following + myself
    const suggestions = await User.find({
      _id: { $nin: followingIds },
    })
      .select("-password")
      .limit(20); // want only 20 profiles

    res.status(200).json({
      count: suggestions.length,
      users: suggestions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error while loading suggestions",
      error: err.message,
    });
  }
};
