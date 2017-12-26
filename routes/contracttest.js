var express = require("express");
var router = express.Router();
const fs = require('fs');

var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://140.119.163.105:8546');

var doquery = require('../config/dbconfig');
var web3 = require('../config/web3');
var eth = web3.eth;

var contract_abi = JSON.parse(fs.readFileSync('contract/AgreementNew.json', 'utf8'));
var contract_bytecode = '0x' + fs.readFileSync('contract/AgreementNew.bin', 'utf8');

router.get('/', function (req, res) {
  res.send("index");
})

router.get('/contractDeploy', function (req, res) {

  let Agreement = eth.contract(contract_abi);
  let gasEstimate = 1000000;

  let contractData = Agreement.new.getData("0xf47dbfc389a7ce03bd0946629735764659a97023", 1514213248, 1514313248, 600, {
    data: contract_bytecode
  })
  
  res.send("done")
  // web3.eth.sign("0x52da64497cc678d5fe56379e93fbc3a25293b0cc", contractData, function(err, result) {
  //   if(!err) {
  //     console.log(result)
  //     res.send("done")
  //   }
  //   else {
  //     console.log(err)
  //     res.send("failed")
  //   }
  // })

  // req.session.user_id = 5;
  // var user_id = req.session.user_id;
  // var todo = doquery("select privateKey from users where id = ?", user_id);
  // todo.then(input => {
  //   console.log(input[0].privateKey)
  //   return input[0].privateKey
  // }).catch(input => {
  //   console.log(input)
  // }).then(input => {
  //   eth.accounts.signTransaction({
  //     data: contractData,
  //     gas: gasEstimate
  //   })
    
  // })



  // console.log(testing)
  // res.send(testing)
  // Agreement.new("0xf47dbfc389a7ce03bd0946629735764659a97023", 1514213248, 1514313248, 600,{
  //   from: eth.coinbase,
  //   data: contract_bytecode,
  //   gas: gasEstimate
  // }, function(err, result) {
  //   if(!err) {
  //     console.log(result)
  //     res.json(result)
  //   }
  //   else {
  //     console.log(err)
  //     res.send(err);
  //   }
  // })

  // console.log(result)
  // var data = {
  //   gasEstimate: result.estimateGas,
  //   gasPrice: result.gasPrice,
  //   blockNumber: result.blockNumber,
  //   transactionHash: result.transactionHash
  // }

  // setTimeout(function() {
  //   var toshow = eth.getTransaction("0xab8af75c801c50549141dfa7d43a08054424eb03ddc91e6e53559b74a572b8f8")
  //   res.json(toshow)
  // }, 500);
})

function newAgreeement(user_address, start_date, end_date, price_per_day) {
  let Agreement = eth.contract(contract_abi);
  let gasEstimate = 1000000;

  return new Promise(function (resolve, reject) {
    Agreement.new("0xf47dbfc389a7ce03bd0946629735764659a97023", 1514213248, 1514313248, 600, {
      from: eth.coinbase,
      data: contract_bytecode,
      gas: gasEstimate
    }, function (err, result) {
      if (!err) {
        console.log(result)
        resolve(result)
      } else {
        console.log(err)
        reject(err)
      }
    })
  })
}

router.get('/testingVariable', function (req, res) {

  let contract_address = "0x461DCCa467F15B6934c9EAbd8Fa39930C8b4E08F"
  let Agreement = eth.contract(contract_abi).at(contract_address);
  Agreement.host({
    from: eth.coinbase,
    gas: 210000
  }, function (err, txhash) {
    if (!err) {
      console.log(txhash)
      res.send(txhash)
    } else {
      res.send(err)
    }
  })
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