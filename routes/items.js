var express = require('express');
var router = express.Router();
var doquery = require('../config/dbconfig');


router.get('/', function(req, res) {
  res.send('items index pages')
})

router.get('/list', function(req, res) {
  var toquery = "select * from items"
  var todo = doquery(toquery, "");

  todo.then(input => {
    res.render('/items/list', {
      title: "items list",
      data: input
    })
  }).catch(input => {
    console.log(input)
  })
})

router.get('/insert', function(req, res) {

})

router.get('/update', function(req, res) {

})

module.exports = router;