const express = require('express');
const router = express.Router();
router.get('/', function(req, res) {
  res.render('editprofile', { title: 'EditProfile' });
});

module.exports = router;