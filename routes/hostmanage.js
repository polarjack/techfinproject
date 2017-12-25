var express = require("express");
var router = express.Router();

var doquery = require('../config/dbconfig');
var Web3 = require('../config/web3');
var eth = Web3.eth;
// var deployContract = require('')

//middleware
// router.use("/", function(req, res, next) {
//   if (req.session.login != "hidden") {
//     res.redirect("../login");
//   } else {
//     next();
//   }
// });

router.get("/", function(req, res) {
  res.redirect("/hostmanage/mylist");
});

router.get("/mylist", function(req, res) {
  res.render("hostmanage/mylist", {
    title: "hostmanage mylist",
    login: req.session.login
  });
});

router.get("/insert", function(req, res) {
  res.render("hostmanage/iteminsert", {
    title: "hostmanage insert",
    login: req.session.login
  });
});

router.post('/iteminsertdo', function(req, res) {
  var user_id = req.session.user_id;
  var user_address = req.session.user_address;

  var data = {
    item_name: req.body.itemName,
    location: req.body.location,
    price_perday: req.body.pricePerDay,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    owner: user_id
  }
  // var todo = doquery("insert into items into ?", data);


  res.json(req.body);
})

router.get("/showsession", function(req, res) {
  res.json(req.session);
});

router.get('/testweb3', function(req, res) {
  var coinbase = eth.coinbase;
  var coinbaseBalance = eth.getBalance(coinbase)
  console.log(coinbase)
  res.send(coinbaseBalance)
})

module.exports = router;
