const { response } = require('express');

const getAll = (req, res = response) => {
    res.json({
         msg: 'getAll Users' 
    });
}

const get = (req, res = response) => {
    const id = req.params.id;

    res.json({
         msg: 'get User' ,
         id
    });
}

const add = (req, res = response) => {
    const { email } = req.body;

    if(!email){
        throw res.status(400).json({
            msg: "Error, no se encontró 'email' en el cuerpo de la petición!" ,
       });
    }

    res.json({
         msg: 'add User' ,
         email
    });
}

const remove = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'remove User' ,
        id
   });
    
}

module.exports = {
    getAll,
    getAll, 
    get, 
    add, 
    remove
}