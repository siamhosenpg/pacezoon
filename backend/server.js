// Import dependencies (ESM syntax)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes (must include .js extension)
import postsRoute from "./src/routes/postsroute.js";
import usersRoute from "./src/routes/usersroute.js";

// Load environment variables
dotenv.config();

// Create __dirname equivalent (since not available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// MongoDB URL
const mongodburl =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pacezoon";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

// Use routes
app.use("/posts", postsRoute);
app.use("/users", usersRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
