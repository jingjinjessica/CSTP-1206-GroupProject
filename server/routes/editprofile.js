const express = require("express");
const router = express.Router();

const{editProfile}= require("../controller/user");

router.get('/', function(req, res) {
    res.render('editprofile.html');
  });


router.post("/",editProfile);
module.exports = router;