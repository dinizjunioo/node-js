'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const router = express.Router();
app.use(express.static(__dirname + '/src'));
// carrega as rotas
//const indexRoute = require('./routes/index-route');
//const productRoute = require('./routes/product-route');

// rota
app.get('/', (request , response, next) =>{
    /*response.status(200).send(
        {
            title:"API node",
            version:"0.0.2"
        }
    );*/
    response.sendFile(path.join(__dirname + "/index.html"));
   // response.render('index', {text: 'this is ejs'});
} );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// arquivos estaticos

//app.use('/', route);
//app.use('/products', productRoute);

//console.log(__dirname);

module.exports = app;