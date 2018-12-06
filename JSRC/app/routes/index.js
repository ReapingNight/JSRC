var express = require('express');
var router = express.Router();

/* GET home page. */

router.get("/game", function(req, res) {
  res.sendFile('game.html', {root: './public'});
});

router.get('/', function(req, res) {
  res.sendFile('splash.html', { root: './public' });
});

router.get("*", function(req, res){
  res.status(404).send("Error 404: Page not found");
})

module.exports = router;