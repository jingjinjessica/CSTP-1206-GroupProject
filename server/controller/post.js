const Post = require("../model/Post");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const createPost = async (request, response) => {
  const data = request.body;
  // console.log(request.headers?.authorization);
  // console.log(data);

  // The ? mark checks for optional
  const token = request.headers?.authorization.split(" ")[1];
  //console.log(token);

  if (token) {
    const decodedValue = jwt.decode(token, { complete: true });

    const findUser = await User.findOne({
      email: decodedValue?.payload?.email,
    });
    console.log(findUser.email);

    if (findUser) {
      const newPost = new Post({
        title: data.title,
        desc: data.desc,
        photo: data.photo,
        categories: data.categories,
        user: data._id,
      });

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

const getAllPosts = async (request, response) => {
  try {
    const data = await Post.find().populate({
      path: "user",
    });

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

module.exports = {
  createPost,
  getAllPosts,
};
