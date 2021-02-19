const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const readFile = require('../jobs/readFile');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paymentPath = process.env.PAYMENT_PATH;
        this.userPath = process.env.USER_PATH;
        this.shopPath = process.env.SHOP_PATH;
        this.uploadPath = process.env.UPLOAD_PATH;

        // Connection to DB
        this.connectionDB();

        // Middlewares
        this.middlewares();

        // Routes
       this.routes();

    }

    routes(){
        this.app.use(this.paymentPath, require('../routes/payment'));
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.shopPath, require('../routes/shop'));
        this.app.use(this.uploadPath, require('../routes/upload'));
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

        // FileUpload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    async connectionDB(){
        await dbConnection();
    }
}

module.exports = Server;