const mongoose = require('mongoose')
const applog = require('debug')('bread')
const dblog = require('debug')('mongo')
const express = require('express')
const app = express()

const expensesRouter = require('./routes/expenses')

require('dotenv').config()

app.use(express.json())
app.use('/expenses', expensesRouter)

const connectionString = process.env.APP_CONNECTION_STRING
const app_port = process.env.APP_PORT || 4000

mongoose
    .connect(connectionString, { 
        useNewUrlParser: true 
    })
    .then(() => dblog('connected to mongodb'))
    .catch((err) => dblog('Error: ', err))

app.listen(app_port, () => applog(`listening to.. ${app_port}`))