var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

connection.connect(function(err) {
  if (err) {
    console.log("Error while connecting with database");
  }
});

function doquery(query, data) {
  return new Promise(function(resolve, reject) {
    connection.query(query, data, function(err, output) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(output);
    });
  });
}

// var getPrivateKey = function(user_id) {
//   connection.query("select privateKey from users where id = ?", user_id, function(err, output) {
//     if(!err) {
//       console.log(output[0].privateKey)
//       return output[0].privateKey;
//     }
//     else {
//       console.log(err)
//       throw "undefined"
//     }
//   })
// }

module.exports = doquery;
