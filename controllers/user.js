const { response } = require('express');
const User = require('../models/user');
const Payment = require('../models/payment');

const getAll = async(req, res = response) => {
    try{
        const users = await User.find();

        return res.json({
            users
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error, no se ha podido acceder a los datos de usuarios. `
        });
    }
}

const get = async(req, res = response) => {
    const email = req.params.email;
   
    try{
        const user = await User.findOne({email});
        return res.json({
            user
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const add = async(req, res = response) => {
    const { email } = req.body;
    
    try{
        const user = new User({email});
        await user.save();

        return res.status(201).json({
            user
        });
    }catch(err){
        console.log(err);
        throw res.status(500).json({
            msg: ` Error interno de la aplicación! `
        });
    }
}

const remove = async(req, res = response) => {
    const email = req.params.email;

    try{
        const user = await User.findOne({email});
        
        await User.deleteOne({email});
        await Payment.deleteMany({user: user._id});
        
        if(user){
            return res.json({
                user
            });
        }

    }catch(err){
        console.log(err);
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