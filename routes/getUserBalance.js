var web3 = require("./../config/web3");
var eth = web3.eth;

function getBalance(user_address) {
  var user_balance = eth.getBalance(user_address)
  user_balance = user_balance.toNumber()
  user_balance = web3.fromWei(user_balance, 'ether')

  console.log(user_balance)

  var temp = new Number(user_balance)
  temp = temp.toFixed(4).toString()
  
  console.log(temp)
  return temp;
}

module.exports = getBalance;