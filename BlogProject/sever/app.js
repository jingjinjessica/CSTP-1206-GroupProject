const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");


require("dotenv").config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, (error) => {
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
const createpageRouter = require('./routes/createpage');
const categoriesRouter = require('./routes/categories');
const dashboardRouter = require('./routes/dashboard');
const detailpageRouter = require('./routes/detailpage');
const editprofileRouter = require('./routes/editprofile');
const editblogRouter = require('./routes/editblog');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');


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
