const express = require("express");
const router = express.Router();

const{editProfile}= require("../controller/user");

router.get('/editprofile', function(req, res) {
    res.render('editprofile.html');
  });

router.post("/editprofile",editProfile);
module.exports = router;