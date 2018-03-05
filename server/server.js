const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/test', (req,res)=>{
    var tdItem = new todo({text: req.body.text});
    tdItem.save().then(doc=>{
        res.send(doc);
    },e=>{
        res.status(400).send(3);
    });
});

app.get('/test/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        res.status(404).send('id not found');
    todo.findById({_id:req.params.id}).then((doc)=>{
        if(!doc)
            return res.status(404).send('Document not found.');
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send('Syntax error');
    });
});

const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
