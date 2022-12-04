const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');


const PORT = 4000;
const mongoose = require("mongoose");
const User = require("./sever/model/User");
require("dotenv").config();
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'client/views'));


mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log("There was an error", error);
  } else {
    console.log("Database Succesfully Connected");
  }
});

app.get("/", (request, response) => {
  return response.send("Endpoints are here!");
});



//Router
const createpageRouter = require('./sever/routes/createpage');
const categoriesRouter = require('./sever/routes/categories');
const dashboardRouter = require('./sever/routes/dashboard');
const detailpageRouter = require('./sever/routes/detailpage');
const editprofileRouter = require('./sever/routes/editprofile');
const editblogRouter = require('./sever/routes/editblog');
const loginRouter = require('./sever/routes/login');
const logoutRouter = require('./sever/routes/logout');
const registerRouter = require('./sever/routes/register');


//app.use
app.use('/createpage', createpageRouter);
app.use('/dashboard',dashboardRouter);
app.use('/detailpage',detailpageRouter);
app.use('/editprofile',editprofileRouter);
app.use('/editblog',editblogRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/register',registerRouter);






app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})
