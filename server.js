const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const multer = require("multer");
const userRoutes = require("./server/routes/users");
const postRoute = require("./server/routes/posts");
const editProfileRoute = require("./server/routes/editprofile");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Post = require("./server/model/Post");

require("dotenv").config();

app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Throught this middleware you can connect to your frontend application
app.use(express.static("./client/public"));
app.set("view engine", "ejs");

app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});

function userLogger(req, res, next) {
  console.log("Loading User requests....");
  next(); // Pass the control to the next middleware
}

function postLogger(req, res, next) {
  console.log("Loading Post requests....");
  next();
}

app.use((req, res, next) => {
  next();
});

// We will use middleware
app.use("/api/v1/users", userLogger, userRoutes);
app.use("/api/v1/posts", postLogger, postRoute);
app.use("/api/v1/editprofile", editProfileRoute);

let title = "hello";
app.get("/abc", (req, res) => {
  res.render("", { title: title });
});

app.get("/:blogid", async function (req, res, next) {
  const { blogid } = req.params;
  console.log("this is blog id from server", blogid);
  try {
    const post = await Post.findById(blogid);
    console.log("this is post from server", post);
    //res.status(200).json(post);
    res.render("[blogid]", { post });
  } catch (error) {
    res.status(500).json(error);
  }
  // if (!post) {
  //   res.status(500).json(error);
  // }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
