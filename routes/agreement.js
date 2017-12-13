var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.send("agreement index")
})

router.get('/describe', function(req, res) {
  res.render('agreement/describe', { title: "Agreement describe"})
})

router.get('/contractshow', function(req, res) {
  res.render('agreement/contractshow', { title: "Contract Show"})
})


module.exports = router;