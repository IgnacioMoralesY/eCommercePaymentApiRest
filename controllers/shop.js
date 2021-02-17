const { response } = require('express');

const getAll = (req, res = response) => {
    res.json({
         msg: 'getAll shops' 
    });
}

const get = (req, res = response) => {
    const id = req.params.id;

    res.json({
         msg: 'getShop' ,
         id
    });
}

const add = (req, res = response) => {
    const { name } = req.body;

    if(!name){
        throw res.status(400).json({
            msg: "Error, no se encontró 'name' en el cuerpo de la petición!" ,
       });
    }

    res.json({
         msg: 'add Shop' ,
         name
    });
}

const remove = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'remove Shop' ,
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