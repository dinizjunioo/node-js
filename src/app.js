'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const router = express.Router();
const fs = require('fs');
const path = require('path');

//
const readFile = () =>
{
    const dados = fs.readFileSync('./data/comments.json', 'utf-8')
    return JSON.parse(dados);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//
app.get('/', (request , response, next) =>
{
    response.sendFile(path.join(__dirname + "/index.html"));
} 
);

app.get('/products', (request , response, next) =>
{
    const dados = readFile();
    response.send(dados);
} 
);


app.post('/products', (request , response, next) =>{
    const {Autor, email, msg, msgSensivel } = request.body;
    const currentDados = readFile();
    currentDados.push(request.body);
    fs.writeFileSync('./data/comments.json', JSON.stringify(currentDados), 'utf-8');
    response.status(201).send(
       request.body
    );
} );

app.put('/:id', (request , response, next) =>{
    const id = request.params.id;
    response.status(200).send(
        {
            id: id,
            item: request.body
        }
    );
} );

app.delete('/', (request , response, next) =>{
    response.status(200).send(request.body);
} );

// arquivos estaticos

app.use(express.static(__dirname + '/.'));

module.exports = app;




//const commentsPath = path.join(__dirname, '/../../data/comments.json');

//app.use('/', indexRoute);
//app.use('/products', productRoute);
//console.log(__dirname);
// carrega as rotas
//const indexRoute = require('./routes/index-route');
//const productRoute = require('./routes/product-route');
