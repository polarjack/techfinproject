var Accounts = require('web3-eth-accounts');
var web3 = require('web3');

var accounts = new Accounts('ws://localhost:8546');

function newAccount(input) {
  return accounts.create(input)
}

module.exports = newAccount