const express = require('express')
const router = express.Router()
// const dblog = require('debug')('dbmsg')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send('<h1>Welcome to the rice fields . . .</h1>')
})

router.post('/login', async (req, res) => {
    
    try {
        const user = await User.findOne({
            email: req.body.email,
            // password: req.body.password
        }, {
            _id: 1,
            email: 1,
            password: 1
        })

        const content = {
            id: user._id,
            // iat: Date.now()
        }        

        if(typeof(req.body.password)!== 'string') {
            req.body.password = JSON.stringify(req.body.password)
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        // console.log(user + ' ' + match);
        
        if (user && match) {

            const accessToken = jwt.sign(content, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: '48h'
            })
            res.status(200).json({
                accessToken: accessToken,
            })


        } else {
            res.status(401).json({
                message: 'User & Pass didnt match'
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.get('/token/extend', (req, res) => {

    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {

            const content = {
                id: jwt.decode(token).id,
                // iat: Date.now()
            }

            const accessToken = jwt.sign(content, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: '48h'
            })
            res.status(200).json({
                accessToken: accessToken,
            })

        } else {
            res.send('valid token')
        }
    });
})

// Creating User
router.post('/signup', async (req, res) => {


    if(typeof(req.body.password)!== 'string') {
        req.body.password = JSON.stringify(req.body.password)
    }

    const saltRounds = 10;

    let breadUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        expenses: []
    });

    try {
        const newUser = await breadUser.save()
        res.status(201).json(
            {message: 'User Created',
            id: newUser._id
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router
