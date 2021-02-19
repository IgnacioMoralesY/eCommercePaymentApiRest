const User = require('../models/user');
const Shop = require('../models/shop');

const emailExist = async(emailUser = '') => {
    const user = await User.findOne({email: emailUser});
    if(!user){
        throw new Error(`El usuario con email ${ emailUser } no existe en la base de datos!`);
    }
}

const emailNotExist = async(emailUser = '') => {
    const user = await User.findOne({email: emailUser});
    if(user){
        throw new Error(`El usuario con email ${ emailUser } ya existe en la base de datos!`);
    }
}

const nameExist = async(shop = '') => {
    const shopExist = await Shop.findOne({name: shop});
    if(!shopExist){
        throw new Error(`La tienda con nombre ${ shop } no existe en la base de datos!`);
    }
}

const nameNotExist = async(shop = '') => {
    const shopExist = await Shop.findOne({name: shop});
    if(shopExist){
        throw new Error(`La tienda con nombre ${ shop } ya existe en la base de datos!`);
    }
}

module.exports = {
    emailExist,
    nameExist,
    emailNotExist,
    nameNotExist
}