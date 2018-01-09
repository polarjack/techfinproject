var express = require("express");
var router = express.Router();

var doquery = require("../config/dbconfig");
var Web3 = require("../config/web3");
var eth = Web3.eth;
var getBalance = require("./getUserBalance")

var chain = require("./rawtx");

router.use("/", function (req, res, next) {
  if (req.session.login != "hidden") {
    res.redirect("/login");
  } else {
    req.session.user_balance = getBalance(req.session.user_address);
    
    next();
  }
});

router.get('/', function (req, res) {
  res.send("done");
})

router.get('/ordered/:id', function (req, res) {
  console.log(req.params.id);

  var user_id = req.session.user_id;
  var user_address = req.session.user_address;

  var todo = doquery("select * from items where id = " + req.params.id, "");
  todo.then(input => {

    var entry = chain.contractEntry(input[0].contract_address)
    console.log(input[0].contract_address);

    var ifbook = entry.ifbook();

    console.log("ifbook: " + ifbook)

    res.render("book/order", {
      title: "order",
      login: req.session.login,
      balance: req.session.user_balance,
      data: input[0],
      ifbook: ifbook
    })
  }).catch(input => {
    console.log(input)
    res.send("failed")
  })
})

router.post('/orderaction', function (req, res) {
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
  var entry = chain.contractEntry(contract_address);

  entry.book(user_address, {
    from: eth.coinbase,
    gas: 100000
  }, function (err, txhash) {
    if (!err) {
      data.transaction = txhash
      var todo = doquery("INSERT INTO book SET ?", data);

      todo.then(input => {
        console.log(input)
        res.redirect("list");
      }).catch(input => {
        console.log(input)
        res.send("failed")
      })
    } else {
      console.log(err)
      res.redirect("ordered/:" + require_id);
    }
  })
})

router.get('/list', (req, res) => {
  var user_id = req.session.user_id;
  var user_address = req.session.user_address;

  var todo = doquery("select *, book.start_date as start_datev2, book.end_date as end_datev2 from items inner join book on items.id = book.item_id where items.status = '1' and book.status = '1' and book.user_id = " + user_id, "")

  todo.then(input => {
    console.log(input);
    res.render("book/list", {
      title: "My Order",
      login: req.session.login,
      data: input,

      balance: req.session.user_balance
    })
  }).catch(input => {
    console.log(input);
    res.send("failed")
  })
})

router.get('/cancel', (req, res) => {
  console.log("cancel");

  console.log(req.query.user_address);
  console.log(req.query.contract_address);
  console.log(req.query.password);


  var user_address = req.session.user_address;
  var contract_address = req.query.contract_address;
  var password = req.query.password;

  var entry = chain.contractEntry(contract_address)

  entry.cancel(user_address, {
    from: eth.coinbase,
    gas: 1000000
  }, function (err, txhash) {
    if (!err) {
      var todo = doquery("update book set status = '0' where user_address = ? and contract_address = ?", [user_address, contract_address]);
      todo.then(input => {
        res.json({
          status: "done"
        })
        console.log(input)
      }).catch(input => {
        res.json({
          status: "failed"
        })
        console.log(input)
      })
      res.json({
        status: "done"
      })
    } else {
      res.json({
        status: "failed"
      })
    }
  })
})

router.get("/testing", (req, res) => {
  var a = req.query.a;
  var b = req.query.b;
  console.log(a, b)

  res.send(a + b)
})


// router.get('/testcontract', function(req, res) {
//   var user_address = req.session.user_address;
//   var user_password = "123456"
//   var contract_address = "0xf60b2d15b56ccb6beb647f8b03e220352833a5c1"
// })

module.exports = router;