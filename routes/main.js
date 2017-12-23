var express = require('express');
var router = express.Router();


router.use('/', function (req, res, next) {
  if(req.session.login != "hidden") {
    res.redirect('../login')
  }
  else {
    next()
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('intro');
  // res.render('main/index', { title: 'Main' });
});

router.get('/intro', function (req, res) {
  res.render('main/intro', {
    title: 'Intro',
    login: req.session.login
  })
})

router.get('/travel', function (req, res) {
  res.render('travel', {
    title: "travel",
    login: req.session.login
  })
})

router.get('/host', function (req, res) {
  res.render('main/host', {
    title: "host",
    login: req.session.login
  });
})

module.exports = router;