var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/splash', function(req, res) {
  res.sendfile('splash.html', { root: './public' });
});

module.exports = router;
