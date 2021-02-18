const { response } = require('express');
const User = require('../models/user');
const Shop = require('../models/shop');
const Payment = require('../models/payment');

const getAll = async(req, res = response) => {
    try{
        const payments = await Payment.find().populate('user', 'email').populate('shop', 'name');

        const totalPaymentsPerUser = getListPaymentsForUserAndShopCredits(payments);

        return res.json({
            payments: totalPaymentsPerUser
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de creditos. `
        });
    }
}

const getAllForUser = async(req, res = response) => {
    const email = req.params.email;
    
    const userBd = await User.findOne({email});

    try{
        const payments = await Payment.find({user: userBd._id}).populate('user', 'email').populate('shop', 'name');

        const totalPaymentsPerUser = getListPaymentsForUserAndShopCredits(payments);

        return res.json({
            payments: totalPaymentsPerUser
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de creditos. `
        });
    }
}

const getAllForUserAndShop = async(req, res = response) => {
    const { email, shop } = req.params;

    const userBd = await User.findOne({email});
    const shopBd = await Shop.findOne({name: shop});

    try{
        const payments = await Payment.find({user: userBd._id, shop: shopBd._id}).populate('user', 'email').populate('shop', 'name');

        const totalPaymentsPerUser = getListPaymentsForUserAndShopCredits(payments);

        return res.json({
            payments: totalPaymentsPerUser
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de creditos. `
        });
    }
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

const getListPaymentsForUserAndShopCredits = (payments) => {
    const totalPaymentsPerUser = payments.reduce((totalPayment, payment) => {
        let creditShop = {
            shopId: payment.shop._id,
            name: payment.shop.name,
            credit: payment.credit
        }

        let existUserInTotal = totalPayment.find(totalPay => totalPay.userId === payment.user._id); // find user
        if(existUserInTotal){
            let existShopInTotal = existUserInTotal.credits.find(creditShop => creditShop.shopId === payment.shop._id); //find shop
            if(existShopInTotal){
                existShopInTotal.credit += payment.credit; // sum credits
            }else{
                existUserInTotal.credits.push(creditShop); // add new credit
            }
        }else{
            let totalPay = {
                userId: payment.user._id,
                email: payment.user.email,
                credits: [ creditShop ]
            }
            totalPayment.push(totalPay);
        }

        return totalPayment;
    }, []); 

    return totalPaymentsPerUser;
}


module.exports = {
    getAll,
    getAllForUser,
    getAllForUserAndShop,
    addCreditsToUser,
    removeCreditsToUser
}