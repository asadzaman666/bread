require('dotenv').config()
const mongoose = require('mongoose')
// const dblog = require('debug')('dbmsg')
const express = require('express')
const app = express()

const expensesRouter = require('./routes/bread-routes')
const defaultRouter = require('./routes/default')

app.use(express.json())
app.use('/', defaultRouter)
app.use('/expenses', expensesRouter)

const connectionString = process.env.APP_CONNECTION_STRING
const app_port = process.env.PORT || 5000

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(connectionString, { 
        useNewUrlParser: true 
    })
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log('Error: ', err))

app.listen(app_port, "0.0.0.0", () => console.log(`listening on.. ${app_port}`))