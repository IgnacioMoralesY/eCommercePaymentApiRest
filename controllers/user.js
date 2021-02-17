const { response } = require('express');
const User = require('../models/user');

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
    const id = req.params.id;
   
    try{
        const user = await User.findById(id);
        return res.json({
            user
        });
    }catch(err){
        console.log(err);
        throw res.status(404).json({
            msg: `El usuario con id ${id} no existe en la base de datos. `
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
    const id = req.params.id;

    try{
        const user = await User.findByIdAndDelete(id);
        if(user){
            return res.json({
                user
            });
        }
    }catch(err){
        console.log(err);
    }

    throw res.status(500).json({
        msg: ` No existe el usuario con id ${id} en la base de datos! `
    });
}

module.exports = {
    getAll, 
    get, 
    add, 
    remove
}