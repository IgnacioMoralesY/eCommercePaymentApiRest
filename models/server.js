const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paymentsPath = '/api/payments';

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    routes(){
        this.app.use(this.paymentsPath, require('../routes/payments'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

    middlewares(){
        // CORS 
        this.app.use(cors());

        //Public
        this.app.use(express.static('public'));
    }
}

module.exports = Server;