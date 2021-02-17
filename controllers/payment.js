const { response } = require('express');

const getAll = (req, res = response) => {
    res.json({
         msg: 'getAll - controller' 
    });
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

const addCreditsToUser = (req, res = response) => {
    const { emailUser, shop, credit } = req.body;
    
    validationParametersOrBody(emailUser, 'emailUser', res);
    validationParametersOrBody(shop, 'shop', res);
    validationParametersOrBody(credit, 'credit', res);

    res.status(200).json({
        msg: 'getUserShop shop- controller',
        emailUser,
        shop,
        credit 
   });
    
}

const removeCreditsToUser = (req, res = response) => {
    const { emailUser, shop, credit } = req.body;
    
    validationParametersOrBody(emailUser, 'emailUser', res);
    validationParametersOrBody(shop, 'shop', res);
    validationParametersOrBody(credit, 'credit', res);

    res.status(200).json({
        msg: 'getUserShop shop- controller',
        emailUser,
        shop,
        credit 
   });
}

const validationParametersOrBody = (element, elementName, res) => {
    if(!element){
        throw res.status(400).json({
            msg: "Error, no se encontró '"+elementName+"' en el cuerpo de la petición!" ,
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