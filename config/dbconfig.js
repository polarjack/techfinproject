var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "140.119.163.66",
  user: "root",
  password: "jack850912",
  database: "techfin"
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

module.exports = doquery;
