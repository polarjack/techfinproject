var express = require('express');
var router = express.Router();
// var http = require('http');

var path = require("path");
var fs = require("fs");
var doquery = require('../config/dbconfig');
var getNewAddress = require('../store/generateKeyFile');
var web3 = require("./../config/web3");
var eth = web3.eth;
var BigNumber = require("bignumber.js")
var getBalance = require("./getUserBalance");


/* GET home page. */
// smaple page
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// router.get('/unlock', function(req, res) {
//   res.render('unlock', { title: "unlock"})    
// })

router.get('/login', function (req, res) {
  res.render('userlogin', {
    title: "login",
    login: "login",
    balance: "login"
  })
})

router.post('/verify', (req, res) => {
  console.log(req.body)
  const todo = doquery("select * from users where account = ? and password = ?", [req.body.account, req.body.password])

  todo.then(input => {

    console.log(input)

    //express-session setting
    if (input.length > 0) {
      req.session.user_id = input[0].id
      req.session.name = input[0].name
      req.session.email = input[0].email
      req.session.user_address = input[0].address
      req.session.user_balance = getBalance(input[0].address)

      req.session.login = "hidden"
      res.redirect('/intro')
    } else {
      res.redirect('/login')
    }
  }).catch(input => {
    console.log(input)
    res.redirect('/login')
    res.json("error")
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('intro');
})

router.get('/intro', function (req, res) {
  res.render('intro', {
    title: 'Intro',
    login: req.session.login,
    balance: req.session.user_balance
  })
})

router.get('/host', function (req, res) {
  res.redirect('/hostmanage');
})

router.get('/travel', function (req, res) {
  var todo = doquery("select * from items where status = 1")
  todo.then(input => {
    res.render('travel', {
      title: "travel",
      login: req.session.login,
      data: input,
      balance: req.session.user_balance
    })
  })
})

router.get('/insert', (req, res) => {
  res.render('users/insert', {
    title: 'Insert User',
    login: req.session.login,
    balance: req.session.user_balance
  })
})

router.post('/insertAction', (req, res) => {
  var ethinfo = getNewAddress(req.body.password)

  var dbinput = {
    account: req.body.account,
    password: req.body.password,
    email: req.body.email
  }

  dbinput.address = ethinfo.address;
  dbinput.privateKey = '0x' + ethinfo.privateKey.toString('hex');

  // res.json(dbinput)
  const todo = doquery("insert into users set ?", dbinput, function (err) {
    if (err) throw err;
  })

  var txhash = eth.sendTransaction({
    from: eth.coinbase,
    gas: 2000000,
    to: ethinfo.address,
    value: web3.toWei('5000', 'ether')
  })
  console.log(txhash)

  req.session.importantlink = ethinfo.address;

  todo.then(input => {
    console.log(input);
    res.redirect('/myinfo');
  }).catch(input => {
    console.log(input);
    res.redirect('/insert');
  })
})

router.get('/myinfo', function (req, res) {
  var user_address = req.session.importantlink;
  
  // var user_address = "0x7bb2b8512feffb423ae62618042c9ca50f4467f9";

  var address = user_address.replace("0x", "");
  var basepath = path.dirname(require.main.filename);;
  var keystore = path.join(basepath, "store/keystore");
  // var filename = __dirname;
  var filename = findKeyfile(keystore, address, fs.readdirSync(keystore));
  // console.log(filename);
  // filename = filename.replace(basepath, "");
  // res.send(filename)

  var newplace = filename.replace("store", "public")
  console.log(newplace)
  fs.createReadStream(filename).pipe(fs.createWriteStream(newplace));

  newplace = newplace.replace(basepath + "/public", "")
  console.log(newplace)

  res.render('users/info', {
    title: "users info",
    login: req.session.login,
    filename: newplace,
    balance: req.session.user_balance
  })
})

router.get('/remove', (req, res) => {
  var user_address = req.session.importantlink;
  // var user_address = "0x7bb2b8512feffb423ae62618042c9ca50f4467f9";

  var address = user_address.replace("0x", "");
  var basepath = path.dirname(require.main.filename);
  var keystore = path.join(basepath, "store/keystore");
  // var filename = __dirname;
  var filename = findKeyfile(keystore, address, fs.readdirSync(keystore));
  // console.log(filename);
  // filename = filename.replace(basepath, "");
  // res.send(filename)

  var newplace = filename.replace("store", "public")
  setTimeout(() => {
    console.log("remove")
    var result = fs.unlinkSync(newplace)
    console.log(result)
  }, 7000)
  // req.session.destroy()

  res.redirect("logout")
})

router.get("/givememoney", (req, res) => {
  if (req.session.login != "hidden") {
    res.redirect("login");
  }
  if(req.session.balance > 500) {
    res.redirect("intro")
  }
  var result = web3.eth.sendTransaction({
    from: eth.coinbase, 
    to: req.session.user_address,
    value: web3.toWei('100', 'ether'),
    gas: 1000000
  })

  console.log(result);

  setTimeout(() => {
    console.log("update")
    req.session.user_balance = getBalance(req.session.user_address)
    res.redirect("intro")
  }, 7000)
})

function findKeyfile(keystore, address, files) {
  var i, len, filepath = null;
  for (i = 0, len = files.length; i < len; ++i) {
    if (files[i].indexOf(address) > -1) {
      filepath = path.join(keystore, files[i]);
      if (fs.lstatSync(filepath).isDirectory()) {
        filepath = path.join(filepath, files[i]);
      }
      break;
    }
  }
  return filepath;
}

// router.get('/showsession', function(req, res) {
//   res.json(req.session)
// })


// router.get('/unlockdo', function(req, res) {
//   http.get({
//     hostname: "192.168.1.129",
//     port: "8080",
//     path: "/unlock"
//   }, (res) => {
//     console.log("done");
//   })
//   console.log("here inside unlockdo");
//   res.send("done")
// })

module.exports = router;