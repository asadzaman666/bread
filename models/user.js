const mongoose = require('mongoose')
// const dblog = require('debug')('mongo')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [
        {
            date: Date,
            purpose: String,
            amount: Number,
        }
    ]
})

module.exports = mongoose.model('user', userSchema)