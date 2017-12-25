var express = require("express");
var router = express.Router();
const fs = require('fs')

var doquery = require('../config/dbconfig');
var Web3 = require('../config/web3');
var eth = Web3.eth;

var contract_abi = JSON.parse(fs.readFileSync('contract/AgreementNew.json', 'utf8'));
var contract_bytecode = '0x' + fs.readFileSync('contract/AgreementNew.bin', 'utf8');

router.get('/', function(req, res) {
  res.send("index");
})

router.get('/contractDeploy', function(req, res) {

  console.log(eth.coinbase)
  let Agreement = eth.contract(contract_abi);
  let gasEstimate = 1000000;

  var result = Agreement.new("0xf47dbfc389a7ce03bd0946629735764659a97023", 1514213248, 1514313248, 600,{
    from: eth.coinbase,
    data: contract_bytecode,
    gas: gasEstimate
  })

  console.log(result)
  var data = {
    gasEstimate: result.estimateGas,
    gasPrice: result.gasPrice,
    blockNumber: result.blockNumber,
    transactionHash: result.transactionHash
  }

  setTimeout(function() {
    var toshow = eth.getTransaction(result.transactionHash)
    console.log(toshow)
  }, 4000);

  res.json(data);
})

// var deployContract = function(_hostAddress, _startTime,  _endTime, _pricePerDay) {
//   console.log(eth.coinbase)
//   let Agreement = eth.contract(contract_abi);
//   let gasEstimate = 1000000;

//   var result = Agreement.new(_hostAddress, _startTime, _endTime, _pricePerDay, {
//     from: eth.coinbase,
//     data: contract_bytecode,
//     gas: gasEstimate
//   })
//   console.log(result)
//   var data = {
//     gasEstimate: result.estimateGas,
//     gasPrice: result.gasPrice,
//     blockNumber: result.blockNumber,
//     transactionHash: result.transactionHash
//   }

//   setTimeout(function() {
//     var toshow = eth.getTransaction(result.transactionHash)
//     console.log(toshow)
//   }, 4000);

//   res.json(data);
// }


module.exports = router;

// module.exports = {
//   deployContract: deployContract
// };