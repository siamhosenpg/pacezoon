const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;
// env: MONGO_URI e.g. mongodb://localhost:27017/myapp
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
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Sample route integration
const postsRoute = require("./src/routes/postsroute"); // Home route

// Use the router for the root path
app.use("/posts", postsRoute); // Home route

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
