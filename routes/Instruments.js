//importa os módulos do express, rota e Instrument
var express = require('express');
var router = express.Router();
var Instrument=require('../models/Instrument');

//faz o tratamento da rota quando a operação requisitada for get
router.get('/:name?',function(req,res,next){
    //caso seja passado um parâmetro na operação chama a função getInstrumentById
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
    //caso contrário, chama a função getAllInstruments
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

//faz o tratamento da rota quando a operação requisitada for post (chama a função para criar um novo item no banco)
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

//faz o tratamento da rota quando a operação requisitada for delete (chama a função que irá deletar um recurso)
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

//faz o tratamento da rota quando a operação requisitada for put (chama a função que irá atualizar um item)
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
//deixa a var router visível para outros módulos
 module.exports=router;