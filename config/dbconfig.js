var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "140.119.163.66",
    user: "root",
    password: "jack850912",
    database: "techfin"
});

connection.connect(function(err){
    if(err) {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;
