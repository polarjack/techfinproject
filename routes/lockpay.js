var keythereum = require("keythereum");
var web3 = require("./../config/web3");
var Tx = require("ethereumjs-tx");
var fs = require("fs");
var path = require("path");

var eth = web3.eth;

//fix keythereum path
var appDir = path.dirname(require.main.filename);
// const keydatadir = appDir.replace("/routes", "/store");
const keydatadir = appDir + "/store";

const file = "LockPay";

//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(
  fs.readFileSync("contract/LockPay.json", "utf8")
);
var contract_bytecode =
  "0x" + fs.readFileSync("contract/LockPay.bin", "utf8");

var LockPay = eth.contract(contract_abi);

function deploy(user_address, user_password, price_perday) {
  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, keydatadir);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  // console.log(LockPay)
  const contractData = LockPay.new.getData(user_address, price_perday, {
    data: contract_bytecode
  });

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gasLimit: 2000000,
    data: contractData,
    value: 100000000000000000000
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();

  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  console.log(txhash);
  return txhash;
}

function book(user_address, user_password, contract_address) {
  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, keydatadir);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  // LockPay = LockPay.at(contract_address);

  // console.log(LockPay)
  const contractData = LockPay.book.getData(user_address, {
    data: contract_bytecode
  });

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gas: 2000000,
    data: contractData,
    value: 1000000000000000000,
    to: contract_address
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();

  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  console.log(txhash);
  return txhash;
}

function cancel(user_address, user_password, contract_address) {
  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, keydatadir);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  var LockPayself = eth.contract(contract_abi).at(contract_address);

  // LockPay = LockPay.at(contract_address);
  // console.log("inside");
  // console.log(LockPay)

  const contractData = LockPayself.cancelOrder.getData({
    data: contract_bytecode
  });

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gas: 1000000,
    data: contractData,
    to: contract_address
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();

  // return "done";
  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  return txhash;
}

function disableContract(user_address, user_password, contract_address) {
  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, keydatadir);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  //  LockPay = LockPay.at(contract_address);

  // console.log(LockPay)
  const contractData = LockPay.disableContract.getData({
    data: contract_bytecode
  });

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gas: 1000000,
    data: contractData,
    to: contract_address
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();

  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  return txhash;
}

function setlock(
  user_address,
  user_password,
  contract_address,
  endblocknumber
) {
  // find file form __dirname + '/keystore' => assign file address to import file
  // __dirname 是node js 裡面預設的變數 它會抓你現在的path 不包含檔案名稱
  var keyObject = keythereum.importFromFile(user_address, keydatadir);

  // 算出 privateKey
  var privateKey = keythereum.recover(user_password, keyObject);

  //  LockPay = LockPay.at(contract_address);

  // console.log(LockPay)
  const contractData = LockPay.setlock.getData(endblocknumber, {
    data: contract_bytecode
  });

  var rawTx = {
    nonce: web3.eth.getTransactionCount(user_address),
    gas: 1000000,
    data: contractData,
    to: contract_address
  };

  // using ethereumjs-tx function
  var tx = new Tx(rawTx);

  //sign your transaction
  tx.sign(privateKey);

  //unknown function need to check
  var serializedTx = tx.serialize();

  var txhash = web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"));
  // var receipt = web3.eth.getTransactionReceipt(txhash)

  return txhash;
}

function contractEntry(contract_address) {
  const result = eth.contract(contract_abi).at(contract_address);
  return result;
}

function testing() {
  console.log("testing");
}

module.exports = {
  deploy: deploy,
  book: book,
  cancel: cancel,
  disableContract: disableContract,
  setlock: setlock,
  contractEntry: contractEntry
};


// var user_address="0xd290dfe6e650029b661aaa02a644155210a58e96"
// var contract_address="0x8dc90640111595a50a6d9b72658f06e211d70607"
// var password="123456"

// cancel(user_address, password, contract_address)

// var c_address = "0x88E390afB61bD5fF96e9ADD64caAEAff336C044E"
// var user_address = "0x8d1069c2ab95e7655235241f253b4c457d888fbf"
// var user_password = "123456"
// var price_perday = 500

// var book_address = "0x167d8adfca64c6ff0e9a5d92a1fa200ca8339361"
// var book_password = "123456"

// book(book_address, book_password, c_address)
