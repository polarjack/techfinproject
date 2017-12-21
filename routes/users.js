var express = require('express');
var router = express.Router();
var doquery = require('../config/dbconfig');
// var Promise = require('promise');
var newAccount = require('../contract/newAccount');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/userList', (req, res) => {
  let query = "select * from users where status = 1";
  const todo = doquery(query, "");

  todo.then(input => {
    console.log(input)
    res.render('userlist', {
      title: "user list",
      data: input
    })
  }).catch(input => {
    console.log(input)
    res.send('404 error')
  })
})

// router.get('/login', (req, res) => {
//   res.render("userlogin", {
//     title: "userlogin"
//   })
// })

// router.post('/verify', (req, res) => {
//   console.log(req.body)
//   const todo = doquery("select * from users where email = ? && password = ?", [req.body.email, req.body.password])

//   todo.then(input => {
//     console.log(input)
    
//     //express-session setting
//     if(input.length > 0) {
//       req.session.user_id = input[0].id
//       req.session.name = input[0].name
//       req.session.email = input[0].email

//       res.json("success")
//     }
//     else {
//       res.redirect('/users/login')
//     }

//   }).catch(input => {
//     console.log(input)
//     res.redirect('/users/login')
//     res.json("error")
//   })

// })

router.get('/showyourself', (req, res) => {

  if(req.session.user_id !== undefined) {
    res.send("your name is " + req.session.name + ", your e-mail is " + req.session.email);
  }
  else {
    res.redirect('/users/login')
  }
  res.send("show")
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.log(err)
    }
  })
  res.json("logout done")
})

router.get('/insertUser', (req, res) => {
  res.render('insertUser', {
    title: 'Insert User'
  })
})

router.post('/insertUserAction', (req, res) => {
  var ethinfo = newAccount(req.body.password);

  console.log(ethinfo.address);
  console.log(ethinfo.privateKey);

  var dbinput = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    address: ethinfo.address,
    privateKey: ethinfo.privateKey
  }

  const todo = doquery("insert into users set ?", dbinput, function(err) {
    if(err) throw err;  
  })

  todo.then(input => {
    console.log(input);
    res.redirect('/users/userlist');
  }).catch(input => {
    console.log(input);
    res.redirect('/users/insertuser');
  })
})

router.get('/generateaccount', (req, res) => {

})








module.exports = router;