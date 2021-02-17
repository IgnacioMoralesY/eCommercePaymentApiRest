const { Schema, model } = require('mongoose');

const ShopSchema = Schema({
    name: {
        type: String,
        required: [true, 'name es obligatorio'],
        unique: true
    }
})

module.exports = model('Shop', ShopSchema);