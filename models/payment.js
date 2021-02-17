const { Schema, model } = require('mongoose');

const PaymentSchema = Schema({
    credit: {
        type: Number,
        required: [true, 'credit es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    }
})

module.exports = model('Payment', PaymentSchema);