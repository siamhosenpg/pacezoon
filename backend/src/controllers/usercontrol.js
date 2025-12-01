import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";

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

/**
 * ✅ Create new user (with bcrypt hashing)
 */
export const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });

    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        ...savedUser._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot create user", error: err.message });
  }
};

/**
 * ✅ Update user (bcrypt only if password changed)
 */
export const updateUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid);
    const updateData = { ...req.body };

    // If password is updated, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findOneAndUpdate({ userid }, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

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
