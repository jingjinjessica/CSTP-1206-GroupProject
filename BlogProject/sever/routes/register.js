const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
router.get('/', function(req, res) {
  res.render('register', { title: 'register'});
});
router.post('/', async function(req,res)
{
  const postData = req.body;
  const hashedPassword = await bcrypt.hash(postData.pwd, 10);
  const newUser = new User({
    name: postData.username,
    password: hashedPassword,
    email: postData.email
  });

  
  newUser.save().then((data) => {
   res.render('login');
  }).catch((error) => {
    return res.status(500). json({
      message: "fail to create user",
      error
    })
  });

  // console.info(req.body);
});
module.exports = router;