var express = require('express');
var router = express.Router();
var app = express();
var hbs = require('hbs');
var mon = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
