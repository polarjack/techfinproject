var express = require('express');
var router = express.Router();
var doquery = require('../config/dbconfig');


router.get('/', function(req, res) {
  res.send('items index pages')
})

router.get('/list', function(req, res) {
  var toquery = "select * from items"
  var todo = doquery(toquery, "");

  todo.then(input => {
    res.render('items/list', {
      title: "items list",
      data: input
    })
  }).catch(input => {
    console.log(input)
  })
})
// unuse function
// router.get('/insert', function(req, res) {
//   res.render('items/insert', {
//     title: 'items insert'
//   })
// })

// router.post('/insertdo', function(req, res) {
//   var toshow = req.body;
  
//   var start_date = new Date(req.body.startDate)
//   var end_date = new Date(req.body.endDate)
  
//   console.log(start_date.toISOString().substring(0, 19).replace('T', ' '))
//   console.log(end_date.toISOString().substring(0, 19).replace('T', ' '))
  
//   var data = {
//     location: req.body.location,
//     item_name: req.body.itemName,
//     people_available: req.body.peopleAvailable,
//     start_date: start_date,
//     end_date: end_date,
//     price_perday: req.body.pricePerDay
//   }
//   console.log(end_date - start_date)

//   res.send("hello")
//   // console.log(data)
//   // var todo = doquery("insert into items set ?", data);
//   // todo.then(input => {
//   //   res.send("insert done")
//   // }).catch(input => {
//   //   var message = input
//   //   res.send("Failed! " + message)
//   // })
// })

module.exports = router;