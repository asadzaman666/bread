const dblog = require('debug')('mongo')
const express = require('express')
const router = express.Router()
const Expense = require('../models/expense')

// Getting all
router.get('/', async(req, res) => {
    try{
        const expenses = await Expense.find()
        res.status(200).json(expenses)
    }
    catch (err){
        res
        .status(500)
        .json({
            message: err.message
        })
    }
})

// Getting One
router.get('/:id', getExpense, (req, res) => {
    dblog('response',res.expense.notes)
    res.json(res.expense)
})

// Create One
router.post('/', async (req, res) => {
    console.clear()
    dblog(req.body.expenses)
    const expense = new Expense({
        date: Date.now(),
        expenses: req.body.expenses,
        notes: req.body.notes
    })

    try {
        const newExpense = await expense.save()
        res.status(201).json(newExpense)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Updating One
router.patch('/:id', getExpense, async (req, res) => {
    console.clear()
    dblog(req.body)
    dblog(res.expense)
    if(req.body.date ) {
        res.expense.date = req.body.date
    }
    if(req.body.expenses ) {
        res.expense.expenses = req.body.expenses
    }
    if(req.body.notes) {
        res.expense.notes = req.body.notes
    }

    try {
        const updatedExpense = await res.expense.save()
        res.json(updatedExpense)

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Deleting One
router.delete('/:id', getExpense, async (req, res) => {
    try {
        await res.expense.remove()
        res.send({
            message: 'Expense Deleted'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// Get single expense middleware
async function getExpense(req, res, next) {
    let expense
    try {
        expense = await Expense.findById(req.params.id)
        console.clear()
        if (expense == null) {
            return res.status(404).json({
                message: 'No matched data found'
            })
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.expense = expense
    next()
}

module.exports = router