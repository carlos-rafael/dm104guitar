var mysql = require('mysql');
var connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'carlos_dm104'
});

module.exports=connection;