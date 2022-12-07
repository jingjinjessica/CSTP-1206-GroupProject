const express = require("express");
const router = express.Router();

// Here we are using destructuring
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
} = require("../controller/post");

router.get("/", getAllPosts);

router.post("/create", createPost);

router.get("/:id", getPostById);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
