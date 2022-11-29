const express = require('express');
const router = express.Router();
router.get('/', function(req, res) {
  res.render('createpage', { title: 'CreatePage' });
});

module.exports = router;