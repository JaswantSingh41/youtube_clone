const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router ;