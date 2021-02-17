const { response } = require('express');
const User = require('../models/user');
const Shop = require('../models/shop');
const Payment = require('../models/payment');

const getAll = async(req, res = response) => {
    try{
        const payments = await Payment.find().populate('user', 'email').populate('shop', 'name');

        return res.json({
            payments
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de creditos. `
        });
    }
}

const getAllForUser = (req, res = response) => {
    const email = req.params.email;
    

    res.json({
         msg: 'getUser - controller',
         email
    });
}

const getAllForUserAndShop = (req, res = response) => {
    const { email, shop } = req.params;

    res.json({
         msg: 'getUserShop shop- controller' ,
         email,
         shop
    });
}

const addCreditsToUser = async(req, res = response) => {
    let { emailUser, shop, credit } = req.body;

    const userBd = await User.findOne({email: emailUser});
    const shopBd = await Shop.findOne({name: shop});

    if(credit.includes("-")){
        credit =  Number(credit) * -1;
    }
    
    try{
        let payment = new Payment({ 
            credit, 
            user: userBd._id,
            shop: shopBd._id
        }); 

        await payment.save();

        return res.status(201).json({
            payment
        });
    }catch(err){
         console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const removeCreditsToUser = async(req, res = response) => {
    let { emailUser, shop, credit } = req.body;

    const userBd = await User.findOne({email: emailUser});
    const shopBd = await Shop.findOne({name: shop});

    if(!credit.includes("-")){
        credit =  Number(credit) * -1;
    }

    try{
        let payment = new Payment({ 
            credit, 
            user: userBd._id,
            shop: shopBd._id
        }); 

        await payment.save();

        return res.status(201).json({
            payment
        });
    }catch(err){
         console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

module.exports = {
    getAll,
    getAllForUser,
    getAllForUserAndShop,
    addCreditsToUser,
    removeCreditsToUser
}