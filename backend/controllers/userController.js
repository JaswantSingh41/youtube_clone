const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send('User not found');
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { getProfile, updateProfile }