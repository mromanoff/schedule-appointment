var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'App' });
});

/* GET PT schedule */
router.get('/personal-training/schedule', function(req, res) {
  res.render('schedule', { title: 'PT Schedule' });
});

/* GET Rules */
router.get('/personal-training/rules', function(req, res) {
  res.render('rules', { title: 'Rules' });
});

module.exports = router;
