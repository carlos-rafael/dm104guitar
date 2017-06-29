var db = require('../dbconnection');

var Instrument = {
    
    getAllInstruments:function(callback){
        return db.query("SELECT * FROM guitarInventory1", callback);
    },
    getInstrumentByName:function(id, callback){
        return db.query("SELECT * FROM guitarInventory1 WHERE id=?",[id],callback);
    },
    addInstrument:function(Instrument,callback){
        return db.query("INSERT INTO guitarInventory1 VALUES(?,?,?,?)",[Instrument.id, Instrument.name, Instrument.price, Instrument.detail], callback);
    },
    deleteInstrument:function(id, callback){
        return db.query("DELETE FROM guitarInventory1 WHERE id=?",[id],callback);
    },
    updateInstrument:function(id, Instrument, callback){
        return db.query("UPDATE guitarInventory1 SET name=?, price=?,detail=? WHERE id=?",[Instrument.name,Instrument.price,Instrument.detail,Instrument.id],callback);
    }


};
module.exports = Instrument;

