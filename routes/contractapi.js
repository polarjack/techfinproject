var express = require('express');
var router = express.Router();

const web3 = require('./../config/web3.js');
const agreement = require('./../contract/useContract');
const eth = web3.eth;



router.get('/testing', function(req, res) {
  const coinbase = eth.coinbase;
  // console.log(coinbase);
  res.send(coinbase)
})

router.get('/showinit', function(req, res) {
  var todo = agreement.showInit()
  res.send(todo)
})

router.get('/showtime', function(req, res) {
  var todo = agreement.showTime()
  res.send(todo)
})

router.get('/showcurrentblock', function(req, res) {
  var todo = agreement.showCurrentBlock()
  res.send(todo)
})

router.get('/showcurrenttime', function(req, res) {
  var todo = agreement.showCurrentTime()
  var human_time = new Date(todo*1000);


  // var human_year = human_time.getFullYear();
  // var 
  // var human_Date = human_time.getDate();
  
  // var hours = human_time.getHours();
  // var minutes = "0" + human_time.getMinutes();
  // var seconds = "0" + human_time.getSeconds();

  // const toshow = human_year + " " + human_Date + "  ";
  // const times = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  res.send(human_time.toISOString())

})

module.exports = router;