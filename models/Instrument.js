//var db recebe a configuração de acesso ao banco
var db = require('../dbconnection');

//criação do modelo Instrument, com seus respectivos métodos
var Instrument = {
    //método que retorna todos os instrumentos prsentes no banco    
    getAllInstruments:function(callback){
        return db.query("SELECT * FROM guitarInventory1", callback);
    },
    //método que retorna um instrumento com base em um id
    getInstrumentByName:function(id, callback){
        return db.query("SELECT * FROM guitarInventory1 WHERE id=?",[id],callback);
    },
    //método que adiciona um instrumento ao banco
    addInstrument:function(Instrument,callback){
        return db.query("INSERT INTO guitarInventory1 VALUES(?,?,?,?)",[Instrument.id, Instrument.name, Instrument.price, Instrument.detail], callback);
    },
    //método que remove um instrumento do banco
    deleteInstrument:function(id, callback){
        return db.query("DELETE FROM guitarInventory1 WHERE id=?",[id],callback);
    },
    //método que atualiza um instrumento
    updateInstrument:function(id, Instrument, callback){
        return db.query("UPDATE guitarInventory1 SET name=?, price=?,detail=? WHERE id=?",[Instrument.name,Instrument.price,Instrument.detail,Instrument.id],callback);
    }

};

//torna a var Instrument acessível em outros módulos da aplicação
module.exports = Instrument;

