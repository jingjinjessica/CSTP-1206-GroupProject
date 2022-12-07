const Post = require("../model/Post");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//create post
const createPost = async (request, response) => {
  const data = request.body;
  // console.log(request.headers?.authorization);
  // console.log(data);

  // The ? mark checks for optional
  //const token = request.headers?.authorization.split(" ")[1];
  //console.log(token);
  console.log(request.decodedEmail);
  if (request.decodedEmail) {
    //const decodedValue = jwt.decode(token, { complete: true });

    const findUser = await User.findOne({ email: request.decodedEmail });
    console.log(findUser);

    if (findUser) {
      const newPost = new Post(data);

      try {
        const output = await newPost.save();
        return response.status(201).json({
          message: "Post Succesfully Created",
          data: output,
        });
      } catch (error) {
        return response.status(500).json({
          message: "There was an error",
          error,
        });
      }
    } else {
      return response.status(404).json({
        message: "User was not Found!",
      });
    }
  } else {
    return response.status(401).json({
      message: "Token required!",
    });
  }
};

//update post
const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    console.log(post);
    if (post.userID == request.body.userID) {
      console.log("this is post userid", post.userID);
      console.log("this is userid", request.body.userID);
      try {
        const postUpdate = await Post.findByIdAndUpdate(
          request.params.id,
          {
            $set: request.body,
          },
          {
            new: true,
          }
        );
        response.status(200).json(postUpdate);
      } catch (error) {
        console.log(error);
      }
    } else {
      response.status(401).json("You can't update this post.");
    }
  } catch (error) {
    console.log(error);
  }
};

//delete post
const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    console.log(post);
    if (post.userID == request.body.userID) {
      try {
        await post.delete();
        response.status(200).json("Post already deleted.");
      } catch (error) {
        response.status(500).json(error);
      }
    } else {
      response.status(401).json("You can't delete this post.");
    }
  } catch (error) {
    console.log(error);
  }
};

//get all posts
const getAllPosts = async (request, response) => {
  try {
    const data = await Post.find();
    return response.status(200).json({
      message: "Posts found Succesfully",
      data,
    });
  } catch (error) {
    return response.status(500).json({
      message: "There was an error",
      error,
    });
  }
};

//get post by id
const getPostById = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
};
