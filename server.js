var express = require('express');
var ex = require('esamecarlo');
var bodyParser = require('body-parser');
var cors= require('cors');//solo per usare vue.js
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


//POST Di Creazione ToDo
app.post('/list',  function(req, res){
	var a=req.body.name;
	var b=req.body.description;
	var c=req.body.completed;
	var d=req.body.assignedTo;
    ex.addToDo(a,b,c,d);
    res.status(201).json({messagge:'ToDo inserito'});
})

//GET lettura di tutti gli utenti disponibili

app.get('/users',function(req,res){
    var people=["mamma","papà","zia","zio","nonna","nonno"];
    res.json(people);   
})
//GET lettura di tutti i ToDo filtrata per utente

app.get('/list_users', function(req, res) {
   if (req.query.assignedTo) {
        res.json(ex.findListByAssigned(req.query.assignedTo));
    } else {
        res.json(ex.getList());
    } 
})


//DELETE Cancellazione di un ToDo in base all ID

app.delete('/list/:id', function(req, res) {
    var i = parseInt(req.params.id);
    ex.deleteById(i)
    res.json(ex.getList());
})
//GET lettura di tutti i ToDo filtrata per stato di completamento

app.get('/completed', function(req, res) {
 
    res.json(ex.findCompleted());
})
//PUT di modifica di ToDo completed in base all'id
app.put('/list/:id', function(req, res) {
    res.status(201).json(ex.changeBool(req.params.id,req.body.completed));
    
})
//PUT di modifica di ToDo description in base all'id
// app.put('/listen/:id', function(req, res) {
//     res.status(201).json(ex.changeDescription(req.params.id,req.query.description));
    
// })

app.listen(3001);
module.exports = app;