var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('intro');
  // res.render('main/index', { title: 'Main' });
});

router.get('/intro', function (req, res) {
  res.render('main/intro', {
    title: 'Intro'
  })
})

router.get('/travel', function (req, res) {
  res.render('main/travel', {
    title: "travel"
  })
})

router.get('/host', function (req, res) {
  res.render('main/host', {
    title: "host",
    login: ""
  });
})

module.exports = router;