const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.status(201).send({ token });
        // res.status(201).json({ user });
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid login credentials')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.send({ token });
        // res.status(201).json({ user });
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;