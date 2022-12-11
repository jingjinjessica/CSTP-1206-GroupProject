const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const multer = require("multer");
const userRoutes = require("./server/routes/users");
const postRoute = require("./server/routes/posts");
const editProfileRoute = require("./server/routes/editprofile");
const morgan = require("morgan");

require("dotenv").config();

app.use(express.json());

// Throught this middleware you can connect to your frontend application
app.use(express.static("./client/public"));

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
