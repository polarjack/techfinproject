var keythereum = require("keythereum");
var web3 = require('./../config/web3');
var Tx = require('ethereumjs-tx');


var user_address = "0x52da64497cc678d5fe56379e93fbc3a25293b0cc"

//generate contractData from contract_abi & contract_bytecode
var contract_abi = JSON.parse(fs.readFileSync('contract/AgreementNew.json', 'utf8'));
var contract_bytecode = '0x' + fs.readFileSync('contract/AgreementNew.bin', 'utf8');

let Agreement = eth.contract(contract_abi);

let contractData = Agreement.new.getData("0xf47dbfc389a7ce03bd0946629735764659a97023", 1514213248, 1514313248, 600, {
  data: contract_bytecode
})


// Specify a data directory (optional; defaults to ~/.ethereum)
var datadir = "./../store";

// Synchronous
// find file form datadir + '/keystore' => assign file address to import file
var keyObject = keythereum.importFromFile(user_address, datadir); 
//generate privateKey from file
var privateKey = keythereum.recover("techfin", keyObject); //password and keyObject


var gasEstimate = 100000 //must for transaction info

var rawTx = {
  //nonce => maintain by ourself
  nonce: web3.eth.getTransactionCount("0x52da64497cc678d5fe56379e93fbc3a25293b0cc") + 1,
  gasLimit: 1000000,
  data: contractData
}


//using ethereumjs-tx function
var tx = new Tx(rawTx);

//sign your transaction
tx.sign(privateKey);

//unknown function need to check
var serializedTx = tx.serialize();

//console.log(serializedTx.toString('hex'));

// return txhash => 0xb3f82ba6fe88ba33b67937dcdb8974d909eabea67c0cec11f2b87404251fd814
var txhash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
console.log(txhash)


//get txhash and find the info of it. Purpose: contract address
var receipt = web3.eth.getTransactionReceipt(txhash)
console.log(receipt)
//result
// {
//   blockHash: '0xd62ff10ab82bd124a5ef4629c5309a4e93a6433a86f3921668552d2c6c4ccc56',
//   blockNumber: 33158,
//   contractAddress: '0x20d747154ff5b68e479a5880643a6c1a6868fa7b',
//   cumulativeGasUsed: 588161,
//   from: '0x52da64497cc678d5fe56379e93fbc3a25293b0cc',
//   gasUsed: 588161,
//   logs: [],
//   logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   status: '0x1',
//   to: null,
//   transactionHash: '0xb3f82ba6fe88ba33b67937dcdb8974d909eabea67c0cec11f2b87404251fd814',
//   transactionIndex: 0
// }