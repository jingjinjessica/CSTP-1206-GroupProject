const express = require('express');
const router = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');

router.get('/',  function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/',async function(req,res){
  const email =req.body.email;
  const pwd= req.body.password;

  const user = await User.findOne({email: email});
  
  if(user){
    const comparepwd = await bcrypt.compare(pwd, user.password);

      if(comparepwd){
        req.session.user = user;
        res.render("dashboard");
      }
      else{
        res.render('login');
      }


  }

});

module.exports = router;