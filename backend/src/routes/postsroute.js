const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/postcontrol");

// Products route
router.get("/", getPosts);

module.exports = router;
