var express = require("express");
var router = express.Router();

var doquery = require('../config/dbconfig');
var Web3 = require('../config/web3');
var eth = Web3.eth;
// var deployContract = require('')

var chain = require('./rawtx');

//middleware
// router.use("/", function (req, res, next) {
//   if (req.session.login != "hidden") {
//     res.redirect("../login");
//   } else {
//     next();
//   }
// });

router.get("/", function (req, res) {
  res.redirect("/hostmanage/mylist");
});

router.get("/mylist", function (req, res) {
  res.render("hostmanage/mylist", {
    title: "hostmanage mylist",
    login: req.session.login
  });
});

router.get("/insert", function (req, res) {
  res.render("hostmanage/iteminsert", {
    title: "hostmanage insert",
    login: req.session.login
  });
});

router.post('/iteminsertdo', function (req, res) {
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


  res.json(data);
})

router.get("/showsession", function (req, res) {
  res.json(req.session);
});

router.get('/testweb3', function (req, res) {
  var coinbase = eth.coinbase;
  var coinbaseBalance = eth.getBalance(coinbase)
  console.log(coinbase)
  res.send(coinbaseBalance)
})

// router.get("/getprivatekey", function(req, res) {
//   var todo = doquery("select * from users where id = " + req.session.user_id, "");

//   todo.then(input => {
//     console.log(input[0].password)
//     var privateKey = getprivatekey(req.session.user_address, input[0].password)
//     console.log(privateKey)
//     res.send("done")
//   });
// })

router.get("/deploytest", function (req, res) {
  req.session.user_id = 8;
  req.session.user_address = "0xee47120e0af5e54b18c91d37ee1788c5f66e82b0";

  var todo = doquery("select * from users where id = " + req.session.user_id, "");

  var user_address = req.session.user_address;
  var start_date = new Date(1512452936000)
  var end_date = new Date(1516452936000)
  // start_date = start_date.toISOString();
  // end_date = end_date.toISOString();
  
  var price_perday = 300;
  
  // var counting = eth.getTransactionCount(user_address);

  console.log(start_date.toDateString())
  console.log(end_date.toDateString())
  
  todo.then(input => {
    var result = chain.contractDeploy(user_address, input[0].password, start_date, end_date, price_perday)
    res.send("done")
  });
})

router.get("/sendmoney", function(req, res) {
  req.session.address = "0xee47120e0af5e54b18c91d37ee1788c5f66e82b0"
  var user_address = req.session.address
  var txhash = chain.sendMoney(req.session.address)
  txhash = txhash.toString()
  console.log(txhash)
  setTimeout(function() {
    var receipt = Web3.eth.getTransaction(txhash)
    // console.log("after timeout")
    // console.log(txhash)
    // console.log(receipt)
    res.json(receipt)
  }, 4000)

})

module.exports = router;