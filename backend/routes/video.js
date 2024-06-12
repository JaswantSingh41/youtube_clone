const express = require('express');
const Video = require('../models/Video');
const User = require('../models/User');
const Comment = require('../models/Comment')
const VideoLike = require('../models/VideoLike')
const View = require('../models/View')
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

// Upload Video
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, url, thumbnail } = req.body;
        const video = new Video({ title, description, url, thumbnail, userId: req.userId })
        await video.save();
        res.status(201).send(video)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all videos
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().populate('userId', 'username');
        res.send(videos)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get single video by params
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId', 'username')
        if (!video) return res.status(404).send('video not found');
        res.send(video);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Update video
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!video) return res.status(404).send('Video not found')
        res.send(video);
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete video
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).send('Video not found')
        res.send('Video deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

// add Comment
router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        const comment = new Comment({ text, userId: req.userId, videoId: req.params.id })
        await comment.save();
        res.status(201).send(comment)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get Comments
router.get('/:id/comments', authMiddleware, async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.id }).populate('userId', 'username');
        if (!comments) res.send('No comments')
        res.status(201).send(comments)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
        const { like } = req.body;
        const videoLike = new VideoLike({ like, userId: req.userId, videoId: req.params.id })
        await videoLike.save();
        res.status(201).send(videoLike)
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:id/view', authMiddleware, async (req, res) => {
    try {
        const view = new View({ userId: req.userId, videoId: req.params.id })
        await view.save();
        res.status(201).send(view)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;