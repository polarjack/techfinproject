var Accounts = require('web3-eth-accounts');
var web3 = require('web3');
var fs = require('fs');

var accounts = new Accounts('ws://localhost:8546');

var testing = accounts.create("jack850912");
// testing = JSON.stringify(testing)

console.log(testing)

console.log(testing.address.length)
console.log(testing.privateKey.length)

var after = accounts.privateKeyToAccount(testing.privateKey)

console.log(after)

// fs.writeFile('./store/testing.json', testing, 'utf8', function(err) {
//   if(!err) {
//     console.log('done')
//   }
//   else {
//     console.log(err)
//   }
// })


