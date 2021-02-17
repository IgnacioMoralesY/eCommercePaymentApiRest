const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        });

        console.log('Conexion a la base de datos!!');
    } catch (error) {
        console.log(error);
        throw new Error('error al conectar con la base de datos!');
    }

}

module.exports = {
    dbConnection
}