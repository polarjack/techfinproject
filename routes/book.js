var express = require("express");
var router = express.Router();

var doquery = require("../config/dbconfig");
var Web3 = require("../config/web3");
var eth = Web3.eth;

var chain = require("./rawtx");

router.use("/", function(req, res, next) {
  if (req.session.login != "hidden") {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get('/', function(req ,res) {
  res.send("done");
})

router.get('/ordered/:id', function(req, res) {
  console.log(req.params.id);

  var user_id = req.session.user_id;
  var user_address = req.session.user_address;

  var todo = doquery("select * from items where id = " + req.params.id, "");
  todo.then(input => {
    input[0].start_date = new Date(input[0].start_date).toDateString()
    input[0].end_date = new Date(input[0].end_date).toDateString()
    
    var ifbook = chain.getIfBook(input[0].contract_address)

    console.log(input[0])
    res.render("book/order", {
      title: "order",
      login: req.session.login,
      data: input[0],
      ifbook: ifbook
    })
  }).catch(input => {
    console.log(input)
    res.send("failed")
  })
})

router.post('/orderaction', function(req, res) {
  var require_id = req.body.orderId;
  var user_address = req.session.user_address;
  var user_id = req.session.user_id;
  var user_password = req.body.passwordComfirm;
  var order_startDate = req.body.startDate;
  var order_endDate = req.body.endDate;
  var contract_address = req.body.contractAddress;

  var data = {
    item_id: require_id,
    user_address: user_address,
    start_date: order_startDate,
    end_date: order_endDate,
    contract_address: contract_address,
    item_id: require_id,
    user_id: user_id
  }

  // res.json(data)
  var txhash = chain.book(
    contract_address,
    user_address, 
    user_password,
    order_startDate,
    order_endDate
  );
  data.transaction = txhash

  // var previous = doquery("update book set status = 0 where contract_address = " + contract_address, "");

  var todo = doquery("INSERT INTO book SET ?", data);

  todo.then(input => {
    console.log(input)
    res.send("done")
  }).catch(input => {
    console.log(input)
    res.send("failed")
  })

  // setTimeout(function() {
  //   var receipt = Web3.eth.getTransactionReceipt(txhash);
  //   console.log(receipt);
  //   res.send("done")
  // }, 6000)
})

router.get('/list', (req, res) => {
  var user_id = req.session.user_id;
  var user_address = req.session.user_address;

  var todo = doquery("select * from users inner join book on users.address = book.user_address where book.status = 1 and users.id = " + user_id, "")

  todo.then(input => {
    console.log(input);
    res.send("done")
  }).catch(input => {
    console.log(input);
    res.send("failed")
  })
})

router.get("/testing", (req, res) => {
  var contract_address = "0xaec506f54bdb63299a56f54955f16a05a944136a"
  
  var result = chain.getIfBook(contract_address)
  
  res.send(result)
})

// router.get('/testcontract', function(req, res) {
//   var user_address = req.session.user_address;
//   var user_password = "123456"
//   var contract_address = "0xf60b2d15b56ccb6beb647f8b03e220352833a5c1"
// })

module.exports = router;