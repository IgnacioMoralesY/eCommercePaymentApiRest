const { response } = require('express');
const Shop = require('../models/shop');
const Payment = require('../models/payment');

const getAll = async(req, res = response) => {
    try{
        const shops = await Shop.find();

        return res.json({
            shops
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de las tiendas. `
        });
    }
}

const get = async(req, res = response) => {
    const name = req.params.name;
   
    try{
        const shop = await Shop.findOne({name});
        return res.json({
            shop
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const add = async(req, res = response) => {
    const { name }  = req.body;
    
    try{
        const shop = new Shop({ name });
        await shop.save();

        return res.status(201).json({
            shop
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const remove = async(req, res = response) => {
    const name = req.params.name;

    try{
        const shop = await Shop.findOne({name});

        await Shop.deleteOne({name});
        await Payment.deleteMany({shop: shop._id});

        if(shop){
            return res.json({
                shop
            });
        }
    }catch(err){
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }

    
}

module.exports = {
    getAll,
    get, 
    add, 
    remove
}