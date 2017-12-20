var express = require('express');
var router = express.Router();
var http = require('http')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/unlock', function(req, res) {
  res.render('unlock', { title: "unlock"})    
})

router.get('/unlockdo', function(req, res) {
  http.get({
    hostname: "192.168.1.129",
    port: "8080",
    path: "/unlock"
  }, (res) => {
    console.log("done");
  })

  console.log("here inside unlockdo");
  res.send("done")
})

module.exports = router;
