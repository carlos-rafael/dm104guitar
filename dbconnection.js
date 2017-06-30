//faz referência ao módulo mysql adicionado ao projeto
var mysql = require('mysql');

//cria a comunicação com o banco, definindo o host, usuário, senha e o nome do banco de dados
var connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'carlos_dm104'
});
//torna a var connection acessível em outros módulos da aplicação
module.exports=connection;