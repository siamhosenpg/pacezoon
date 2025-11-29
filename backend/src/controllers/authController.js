import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";
import { generateToken } from "../utils/generateToken.js";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: false, // localhost
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ===================== REGISTER =====================
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    const token = generateToken({ id: user._id });

    // 🔥 Set cookie here:
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ===================== LOGIN =====================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id });

    // 🔥 Set cookie here:
    res.cookie("token", token, cookieOptions);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// ===================== GET CURRENT USER =====================
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
