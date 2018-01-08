var express = require('express');
var router = express.Router();
// var http = require('http');

var doquery = require('../config/dbconfig');
var getNewAddress = require('../store/generateKeyFile');

/* GET home page. */
// smaple page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/unlock', function(req, res) {
//   res.render('unlock', { title: "unlock"})    
// })

router.get('/login', function(req, res) {
  res.render('userlogin', { 
    title: "login",
    login: "hidden"
  })
})

router.post('/verify', (req, res) => {
  console.log(req.body)
  const todo = doquery("select * from users where account = ? && password = ?", [req.body.account, req.body.password])

  todo.then(input => {
    console.log(input)
    
    //express-session setting
    if(input.length > 0) {
      req.session.user_id = input[0].id
      req.session.name = input[0].name
      req.session.email = input[0].email
      req.session.user_address = input[0].address
      req.session.login = "hidden"
      res.redirect('/intro')
    }
    else {
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
    if(err) {
      console.log(err)
    }
  })
  res.redirect('intro');
})

router.get('/intro', function(req, res) {
  res.render('intro', { 
    title: 'Intro',
    login: req.session.login
  })
})

router.get('/host', function(req, res) {
  res.redirect('/hostmanage');
})

router.get('/travel', function(req, res) {
  var todo = doquery("select * from items where status = 1")
  todo.then(input => {
    res.render('travel', {
      title: "travel",
      login: req.session.login,
      data: input
    })
  })
})

router.get('/insert', (req, res) => {
  res.render('users/insert', {
    title: 'Insert User',
    login: req.session.login
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
  const todo = doquery("insert into users set ?", dbinput, function(err) {
    if(err) throw err;  
  })

  todo.then(input => {
    console.log(input);
    res.redirect('/users/showyourself');
  }).catch(input => {
    console.log(input);
    res.redirect('/users/insert');
  })
})

router.get('/myinfo', function(req,res) {
  
})

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
