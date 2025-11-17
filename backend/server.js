// Import dependencies (ESM syntax)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { PORT } from "./src/config/config.js";
import { connectDB } from "./src/config/db.js";

// Import routes (must include .js extension)
import authRoutes from "./src/routes/authRoutes.js";
import postsRoute from "./src/routes/postsroute.js";
import usersRoute from "./src/routes/usersroute.js";
import reactionRoutes from "./src/routes/reactionRoutes.js";

// Load environment variables
dotenv.config();

// Create __dirname equivalent (since not available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoutes);
app.use("/reactions", reactionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// example of an optional-auth route
import { optionalAuth } from "./src/middleware/auth.js";
app.get("/maybe", optionalAuth, (req, res) => {
  if (req.user)
    return res.json({ message: "Hello logged-in user", userId: req.user.id });
  return res.json({ message: "Hello guest" });
});

// Start the server
(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running http://localhost:${port}`)
  );
})();
