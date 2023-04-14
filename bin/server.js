'use strict';

const app = require('../src/app');
const debug = require('debug')('desafio:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//server
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//testes
console.log("testando..." + port);

//normalizar portas
function normalizePort(val){
    const port = parseInt(val, 10);
    
    if(isNaN(port)){return val;}

    if(port >= 0){ return port;}

    return false;
}

// tratamento de erros

function onError(error)
{
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port : 'Port ' + port;

    switch (error.code)
    {
        case 'EACCES': 
            console.error(bind + ' requer um privilegio elevado.');
            process.exit(1);
            break;
        case 'EADDRINUSE': 
            console.error(bind + ' esta em uso.');
            process.exit(1);
            break;
        default: 
            throw error;
    }
}

// debug
function onListening()
{
    const addr = server.address();
    const bind = typeof port === 'string' ?
    'Pipe ' + addr : 'Port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;