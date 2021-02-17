const { validationResult } = require('express-validator');
const User = require('../models/user');
const Shop = require('../models/shop');

const validatorPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    } 

    next();
}

module.exports = {
    validatorPost
}