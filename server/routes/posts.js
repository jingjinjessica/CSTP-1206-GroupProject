const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/validate");
const multer = require("../library/multer");

// Here we are using destructuring
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  // getPostById,
} = require("../controller/post");

const { uploadImage } = require("../controller/image");

router.post(
  "/image/upload",
  validateToken,
  multer.single("image"),
  uploadImage
);

router.get("/", getAllPosts);

router.post("/create", validateToken, createPost);

// router.get("/:id", getPostById);

router.put("/:id", validateToken, updatePost);

router.delete("/delete/:id", validateToken, deletePost);

// router.get("/:blogid", function (req, res, next) {
//   const { blogid } = req.params;

//   const blog = data.find((value) => value.blogid === blogid);
//   if (!blog) {
//     throw new Error("blog not found.");
//   }

//   res.render("[blogid]", {
//     ...blog,
//   });
// });

module.exports = router;
