const mongoose = require('mongoose')
const dblog = require('debug')('mongo')

const expenseSchema = new mongoose.Schema({
    date: Date,
    expenses: [{ purpose: String, amount: Number }],
    notes: String
})

module.exports = mongoose.model('bread', expenseSchema)