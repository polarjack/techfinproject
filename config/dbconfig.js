var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "140.119.163.66",
    user: "xuan",
    password: "plsm62292",
    database: "xuan"
});

connection.connect(function(err){
    if(err) {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;