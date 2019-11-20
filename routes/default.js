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

        let d = new Date()
        const content = {
            id: user._id,
            // iat: Date.now()
        }

        const match = await bcrypt.compare(JSON.stringify(req.body.password), user.password);

        if (user && match) {

            const accessToken = jwt.sign(content, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: '1h'
            })
            res.status(200).json({
                accesToken: accessToken,
            })


        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }

    } catch (err) {
        res.status(400).json({
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
                expiresIn: '1h'
            })
            res.status(200).json({
                accesToken: accessToken,
            })

        } else {
            res.send('valid token')
        }
    });
})

// Creating User
router.post('/signup', async (req, res) => {

    const saltRounds = 10;

    let breadUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(JSON.stringify(req.body.password), saltRounds)
    });

    try {
        console.log(breadUser);

        const newUser = await breadUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router
