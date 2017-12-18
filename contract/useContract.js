const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')
const sleep = require('sleep')
const web3 = require('./../config/web3')

let contractName = "agreement"
let gasEstimate = 2000000


// const provider = "http://localhost:8545"
// const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const contract_abi = JSON.parse(fs.readFileSync('./contract/' + contractName + '.json'));
const contract_bytecode = '0x' + fs.readFileSync('./contract/' + contractName + '.bin').toString();

const contractAddress = "0x880A7b1DEbf8229D2FcBf0fD6A4569F55154A314"

var todo = web3.eth.contract(contract_abi).at(contractAddress)

module.exports = todo