const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')
const sleep = require('sleep')

let contractName = "agreement"
let gasEstimate = 2000000

const provider = "http://localhost:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const contract_abi = JSON.parse(fs.readFileSync('./' + contractName + '.json'));
const contract_bytecode = '0x' + fs.readFileSync('./' + contractName + '.bin').toString();

// console.log(contract_abi);
// console.log(contract_bytecode);

let Agreement = web3.eth.contract(contract_abi);

// function deploy() {
//   return  Agreement.new({
//       from: web3.eth.coinbase,
//       data: contract_bytecode,
//       gas: gasEstimate
//     })
  
// }

var testing = Agreement.new({
        from: web3.eth.coinbase,
        data: contract_bytecode,
        gas: gasEstimate
      });


console.log(testing.transactionHash)
const save = testing.transactionHash;

setTimeout(function() {
  var toshow = web3.eth.getTransaction(save)
  console.log(toshow)
},10000);

// while(typeof testing.address === 'undefined') {

//   console.log(testing.address)
//   sleep.sleep(2)
// }