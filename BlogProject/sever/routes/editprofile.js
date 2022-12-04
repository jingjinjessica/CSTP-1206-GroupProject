const express = require('express');
const router = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');
router.get('/', function(req, res) {
  res.render('editprofile', { user: req.session.user, title: "Edit Profile" });
});

router.post('/', async function(req,res){

  const user = req.session.user;

  console.info(req.body);

  console.info(user);

  User.findOneAndUpdate({_id: user._id}, {$set: {avatar: req.body.imageData}}).then((data) => {
    req.session.user = data;
    res.render('editprofile');
   }).catch((error) => {
     return res.status(500). json({
       message: "fail to update user",
       error
     })
   });

  
});

module.exports = router;