const { response } = require('express');
const Shop = require('../models/shop');

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
    const id = req.params.id;
   
    try{
        const shop = await Shop.findById(id);
        return res.json({
            shop
        });
    }catch(err){
        console.log(err);
        throw res.status(404).json({
            msg: `La tienda con id ${id} no existe en la base de datos. `
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
    const id = req.params.id;

    try{
        const shop = await Shop.findByIdAndDelete(id);
        if(shop){
            return res.json({
                shop
            });
        }
    }catch(err){
        console.log(err);
        
    }

    throw res.status(500).json({
        msg: ` No existe la tienda con id ${id} en la base de datos! `
    });
}

module.exports = {
    getAll,
    get, 
    add, 
    remove
}