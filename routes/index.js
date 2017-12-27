var express = require('express');
var router = express.Router();
// var http = require('http');

var doquery = require('../config/dbconfig');

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
  const todo = doquery("select * from users where email = ? && password = ?", [req.body.email, req.body.password])

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
  res.render('travel', {
    title: "travel",
    login: req.session.login
  })
})

router.get('/showsession', function(req, res) {
  res.json(req.session)
})


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
