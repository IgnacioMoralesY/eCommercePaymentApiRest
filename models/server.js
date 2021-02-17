const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paymentPath = '/api/payment';
        this.userPath = '/api/user';
        this.shopPath = '/api/shop';

        // Middlewares
        this.middlewares();

        // Routes
       this.routes();
    }

    routes(){
        this.app.use(this.paymentPath, require('../routes/payment'));
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.shopPath, require('../routes/shop'));
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

    middlewares(){
        // CORS 
        this.app.use(cors());

        // JSON parse to Body
        this.app.use(express.json());

        //Public
        this.app.use(express.static('public'));
    }
}

module.exports = Server;