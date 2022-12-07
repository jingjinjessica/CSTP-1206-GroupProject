const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const multer = require("multer");
const userRoutes = require("./routes/users");
const postRoute = require("./routes/posts");
const editProfileRoute=require("./routes/editprofile");
const session = require('express-session');
const cookieParser = require('cookie-parser');


require("dotenv").config();

app.use(express.json());

// Throught this middleware you can connect to your frontend application
app.use(express.static("../client/public"));

// app.use(cookieParser());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }))

mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});

// app.get("/", (request, response) => {
//   return response.send("Endpoints are here!");
// });

// We will use middleware
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/editprofile",editProfileRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
