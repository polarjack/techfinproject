var keythereum = require("keythereum");
var web3 = require('./../config/web3');
var Tx = require('ethereumjs-tx');
var fs = require('fs')
var path = require('path');

var eth = web3.eth;

//fix keythereum path
var appDir = path.dirname(require.main.filename);
const keydatadir = appDir + "/store"


//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(fs.readFileSync('contract/AgreementNew.json', 'utf8'));
var contract_bytecode = '0x' + fs.readFileSync('contract/AgreementNew.bin', 'utf8');



function getPrivateKey(user_address, user_password) {

  // Synchronous
  // find file form datadir + '/keystore' => assign file address to import file
  var keyObject = keythereum.importFromFile(user_address, keydatadir);
  //generate privateKey from file
  var privateKey = keythereum.recover(user_password, keyObject); //password and keyObject

  return privateKey;
}

function contractDeploy(user_address, user_password, start_date, end_date, price_perday) {
  // Synchronous
  // find file form datadir + '/keystore' => assign file address to import file
  var keyObject = keythereum.importFromFile(user_address, keydatadir);
  //generate privateKey from file
  var privateKey = keythereum.recover(user_password, keyObject); //password and keyObject


  //Prepare
  const Agreement = eth.contract(contract_abi);

  const contractData = Agreement.new.getData(user_address, start_date, end_date, price_perday, {
    data: contract_bytecode
  })

  // must info
  var gasEstimate = 100000 //must for transaction info

  var rawTx = {
    //nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(user_address) + 1,
    gasLimit: 1000000,
    data: contractData
  }

  //using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);


  //unknown function need to check
  var serializedTx = tx.serialize();

  var txhash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
  var receipt = web3.eth.getTransactionReceipt(txhash)

  return receipt;
}

module.exports = getPrivateKey;