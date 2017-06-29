var express = require('express');
var router = express.Router();
var Instrument=require('../models/Instrument');

router.get('/:name?',function(req,res,next){
 
    if(req.params.name){
    
        Instrument.getInstrumentByName(req.params.name,function(err,rows){
            
            if(err)
           {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{
        
        Instrument.getAllInstruments(function(err,rows){
        
            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }
            
        });
    }
});


router.post('/',function(req,res,next){
    
    Instrument.addInstrument(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(req.body);//or return count for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/:name',function(req,res,next){
 
    Instrument.deleteInstrument(req.params.name,function(err,count){
    
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(count);
        }    
    });
 });

router.put('/:name',function(req,res,next){
    
    Instrument.updateInstrument(req.params.name,req.body,function(err,rows){
    
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
 });

 module.exports=router;