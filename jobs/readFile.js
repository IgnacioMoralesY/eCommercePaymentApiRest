const cron = require('node-cron');
const fs = require('fs');
const csv = require('csv-parser')
const User = require('../models/user');
const Shop = require('../models/shop');
const Payment = require('../models/payment');

const readFile = cron.schedule('0 0 * * *', () => {
    
    fs.readdir('./files/', (error, files) => {
        if(error){
            throw error;
        }

        if(files.length > 0){

            files.forEach(nameFiles => {
                let path =  './files/'+ nameFiles;

                fs.createReadStream(path)
                .pipe(csv({separator: ';'}))
                .on('data', async(data, error) => { 
                    if(error){
                        console.log(error);
                        return;
                    }
                   const payment = await savePayment(data);
                   return payment;
                })
                .on('end', (error) => {
                    if(error){
                        console.log(error);
                        return;
                    }
                    console.log('Se completo la lectura de un archivo!');
                    deleteFile(path);
                });
            });      
        }
    });
})

const deleteFile = (path) => {
    fs.unlink(path, (error) => {
        if(error){
            console.error(error);
        }
        console.log('File deleted');
    })
}

const savePayment = async(payment) => {
    let { emailUser, shop, credit } = payment;

    const userBd = await User.findOne({email: emailUser});
    const shopBd = await Shop.findOne({name: shop});

    try{
        credit =  Number(credit);

        let payment = new Payment({ 
            credit, 
            user: userBd._id,
            shop: shopBd._id
        }); 

        const newPay = await payment.save();

        return newPay;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


module.exports = {
    readFile
}