const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1]; // to remove Bearer from token
    if (!token) return res.status(401).send('Invalid token');
     
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send('User not found');
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/profile',authMiddleware ,async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;