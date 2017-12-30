var express = require("express");
var router = express.Router();

var doquery = require("../config/dbconfig");
var Web3 = require("../config/web3");
var eth = Web3.eth;


router.get('/', function(req ,res) {
  res.send("done");
})

router.get('/ordered/:id', function(req, res) {
  console.log(req.params.id);

  var todo = doquery("select * from items where id = " + req.params.id, "");
  todo.then(input => {
    input[0].start_date = new Date(input[0].start_date).toDateString()
    input[0].end_date = new Date(input[0].end_date).toDateString()
    
    console.log(input[0])
    res.render("book/order", {
      title: "order",
      login: req.session.login,
      data: input
    })
  }).catch(input => {
    console.log(input)
    res.send("failed")
  })
})

module.exports = router;