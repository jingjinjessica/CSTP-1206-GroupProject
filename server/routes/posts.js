const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");
// Here we are using destructuring
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
} = require("../controller/post");

router.get("/", getAllPosts);

router.post("/create", validateToken, createPost);

router.get("/:id", getPostById);

router.put("/:id", validateToken, updatePost);

router.delete("/:id", validateToken, deletePost);

module.exports = router;
