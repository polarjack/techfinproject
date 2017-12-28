var express = require('express');
var router = express.Router();
var doquery = require('../config/dbconfig');
// var Promise = require('promise');
// var newAccount = require('../contract/newAccount');
var getNewAddress = require('../store/generateKeyFile');

// router.use("/", function(req, res, next) {
//   if (req.session.login != "hidden") {
//     res.redirect("/login");
//   } else {
//     next();
//   }
// });

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('list');
});

router.get('/list', (req, res) => {
  let query = "select * from users where status = 1";
  const todo = doquery(query, "");

  todo.then(input => {
    console.log(input)
    res.render('users/list', {
      title: "user list",
      data: input
    })
  }).catch(input => {
    console.log(input)
    res.send('404 error')
  })
})

router.get('/showyourself', (req, res) => {
  if(req.session.user_id !== undefined) {
    res.send("your name is " + req.session.name + ", your e-mail is " + req.session.email);
  }
  else {
    res.redirect('login')
  }
  res.send("show")
})

router.get('/insert', (req, res) => {
  res.render('users/insert', {
    title: 'Insert User'
  })
})

router.post('/insertAction', (req, res) => {

  // res.send("done")
  
  // var ethinfo = newAccount(req.body.password);

  // console.log(ethinfo.address);
  // console.log(ethinfo.privateKey);
  
  

  var ethinfo = getNewAddress(req.body.password)
  res.send("done")

  var dbinput = {
    account: req.body.account,
    password: req.body.password,
    email: req.body.email
  }

  dbinput.address = ethinfo.address;
  dbinput.privateKey = ethinfo.privateKey;

  // res.json(dbinput)
  // const todo = doquery("insert into users set ?", dbinput, function(err) {
  //   if(err) throw err;  
  // })

  // todo.then(input => {
  //   console.log(input);
  //   res.redirect('/users/userlist');
  // }).catch(input => {
  //   console.log(input);
  //   res.redirect('/users/insertuser');
  // })
})

module.exports = router;