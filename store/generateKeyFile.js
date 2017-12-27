var keythereum = require("keythereum");

function getNewAccount(_password) {
  var params = { keyBytes: 32, ivBytes: 16 };
  var dk = keythereum.create(params);

  var kdf = "pbkdf2";

  var options = {
    kdf: "pbkdf2",
    cipher: "aes-128-ctr",
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: "hmac-sha256"
    }
  };

  // synchronous
  var keyObject = keythereum.dump(
    _password,
    dk.privateKey,
    dk.salt,
    dk.iv,
    options
  );

  var filePrivateKey = keythereum.recover(_password, keyObject);
  var output = {
    address: '0x' + keyObject.address,
    privateKey: filePrivateKey
  }

  keythereum.exportToFile(keyObject)
  
  return output;
}

module.exports = getNewAccount;