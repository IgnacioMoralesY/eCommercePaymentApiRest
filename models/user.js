const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = model('User', UserSchema);