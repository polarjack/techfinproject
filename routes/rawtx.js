var keythereum = require("keythereum");
var web3 = require("./../config/web3");
var Tx = require("ethereumjs-tx");
var fs = require("fs");
var path = require("path");

var eth = web3.eth;

//fix keythereum path
var appDir = path.dirname(require.main.filename);
const keydatadir = appDir + "/store";

//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(
  fs.readFileSync("contract/Lock.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("contract/Lock.bin", "utf8");

// function getPrivateKey(user_address, user_password) {

//   // Synchronous
//   // find file form datadir + '/keystore' => assign file address to import file
//   var keyObject = keythereum.importFromFile(user_address, keydatadir);
//   //generate privateKey from file
//   var privateKey = keythereum.recover(user_password, keyObject); //password and keyObject

//   return privateKey;
// }

function contractDeploy(
  user_address,
  user_password,
  start_date,
  end_date,
  price_perday
) {
  // Synchronous
  // find file form datadir + '/keystore' => assign file address to import file
  var keyObject = keythereum.importFromFile(eth.coinbase, keydatadir);
  //generate privateKey from file
  var privateKey = keythereum.recover("techfin", keyObject); //password and keyObject

  //Prepare
  const Agreement = eth.contract(contract_abi);

  const contractData = Agreement.new.getData(
    user_address,
    price_perday,
    {
      data: contract_bytecode
    }
  );

  // must info
  var gasEstimate = 100000; //must for transaction info

  var rawTx = {
    //nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(eth.coinbase),
    gasLimit: 1000000,
    data: contractData
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();
  // console.log(user_address)
  // console.log(user_password)
  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  console.log(txhash);
  return txhash;
}

function book(
  contract_address,
  user_address
) {
  var keyObject = keythereum.importFromFile(eth.coinbase, keydatadir);
  // generate privateKey from file
  var privateKey = keythereum.recover("techfin", keyObject); //password and keyObject

  const Agreement = eth.contract(contract_abi).at(contract_address);

  const contractData = Agreement.book.getData(
    user_address,
    {
      data: contract_bytecode
    }
  );

  // must info
  var gasEstimate = 100000; //must for transaction info

  var rawTx = {
    // nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(eth.coinbase),
    gasLimit: gasEstimate,
    data: contractData
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  // sign your transaction
  tx.sign(privateKey);

  // unknown function need to check
  var serializedTx = tx.serialize();
  // console.log(user_address)
  // console.log(user_password)
  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  console.log(txhash);
  return txhash;
}

function sendMoney(user_address) {
  var master_address = eth.coinbase;

  var keyObject = keythereum.importFromFile(master_address, keydatadir);
  //generate privateKey from file
  var privateKey = keythereum.recover("techfin", keyObject); //password and keyObject

  var rawTx = {
    nonce: eth.getTransactionCount(master_address),
    gasLimit: 1000000,
    to: user_address,
    value: 1000
  };

  //using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();
  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // console.log(txhash);

  // var receipt = web3.eth.getTransactionReceipt(txhash)
  // console.log(receipt);

  return txhash;
}

function setLock(user_address, contract_address) {
  var keyObject = keythereum.importFromFile(eth.coinbase, keydatadir);
  // generate privateKey from file
  var privateKey = keythereum.recover("techfin", keyObject); //password and keyObject

  const Agreement = eth.contract(contract_abi).at(contract_address);

  const contractData = Agreement.book.getData(
    user_address,
    {
      data: contract_bytecode
    }
  );

  // must info
  var gasEstimate = 100000; //must for transaction info

  var rawTx = {
    // nonce => maintain by ourself
    nonce: web3.eth.getTransactionCount(eth.coinbase),
    gasLimit: gasEstimate,
    data: contractData
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  // sign your transaction
  tx.sign(privateKey);

  // unknown function need to check
  var serializedTx = tx.serialize();
  // console.log(user_address)
  // console.log(user_password)
  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  console.log(txhash);
  return txhash;
}

function contractEntry(contract_address) {
  const Agreement = eth.contract(contract_abi).at(contract_address);
  return Agreement;
}

module.exports = {
  contractDeploy: contractDeploy,
  sendMoney: sendMoney,
  book: book,
  contractEntry: contractEntry,
  setLock: setLock
};
