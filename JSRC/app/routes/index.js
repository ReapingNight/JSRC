var express = require('express');
var router = express.Router();

/* GET home page. */

router.get("/game", function(req, res) {
  res.sendfile('game.html', {root: './public'});
});

router.get('*', function(req, res) {
  res.sendfile('splash.html', { root: './public' });
});



module.exports = router;
