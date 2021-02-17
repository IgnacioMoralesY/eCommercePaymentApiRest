const { response, request } = require('express');

const getAll = (req = request, res = response) => {
    res.json({
         msg: 'getAll - controller' 
    });
}

const getUser = (req = request, res = response) => {
    res.json({
         msg: 'getUser - controller' 
    });
}

const getUserShop = (req = request, res = response) => {
    res.json({
         msg: 'getUserShop shop- controller' 
    });
}

const addCreditsToUser = (req = request, res = response) => {
    res.json({
         msg: 'addCreditsToUser - controller' 
    });
}

const removeCreditsToUser = (req = request, res = response) => {
    res.json({
         msg: 'removeCreditsToUser- controller' 
    });
}

module.exports = {
    getAll,
    getUser,
    getUserShop,
    addCreditsToUser,
    removeCreditsToUser
}