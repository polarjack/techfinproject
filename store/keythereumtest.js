var keythereum = require("keythereum");
var password = "jack850912";
var params = { keyBytes: 32, ivBytes: 16 };

var dk = keythereum.create(params);

console.log(dk)

// var testing = keythereum.dump("testing", dk.privateKey)
// console.log(testing)

var password = "testing";
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
var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);

keythereum.exportToFile(keyObject)