const Video = require('../models/Video');
const Comment = require('../models/Comment')
const VideoLike = require('../models/VideoLike')
const View = require('../models/View')

const createVideo = async (req, res) => {
    try {
        const { title, description, url, thumbnail } = req.body;
        const video = new Video({ title, description, url, thumbnail, userId: req.userId })
        await video.save();
        res.status(201).send(video)
    } catch (error) {
        res.status(400).send(error);
    }
}

const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('userId', 'username');
        res.send(videos)
    } catch (error) {
        res.status(400).send(error);
    }
}

const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId', 'username')
        if (!video) return res.status(404).send('video not found');
        res.send(video);
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!video) return res.status(404).send('Video not found')
        res.send(video);
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).send('Video not found')
        res.send('Video deleted')
    } catch (error) {
        res.status(400).send(error)
    }
}

const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = new Comment({ text, userId: req.userId, videoId: req.params.id })
        await comment.save();
        res.status(201).send(comment)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.id }).populate('userId', 'username');
        if (!comments) res.send('No comments')
        res.status(201).send(comments)
    } catch (error) {
        res.status(400).send(error)
    }
}

const likeVideo = async (req, res) => {
    try {
        const { like } = req.body;
        const videoLike = new VideoLike({ like, userId: req.userId, videoId: req.params.id })
        await videoLike.save();
        res.status(201).send(videoLike)
    } catch (error) {
        res.status(400).send(error);
    }
}

const viewVideo = async (req, res) => {
    try {
        const view = new View({ userId: req.userId, videoId: req.params.id })
        await view.save();
        res.status(201).send(view)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { createVideo, getVideos, getVideo, updateVideo, deleteVideo, createComment, getComments, likeVideo, viewVideo }