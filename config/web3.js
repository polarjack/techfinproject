var Web3 = require('web3')

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

//chain on r715
var web3 = new Web3(new Web3.providers.HttpProvider('http://140.119.163.105:8545'));

module.exports = web3;