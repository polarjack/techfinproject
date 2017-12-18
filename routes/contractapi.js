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
  
  res.send("this is a message")
})


module.exports = router;