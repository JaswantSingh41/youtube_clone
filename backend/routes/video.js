const express = require('express');
const { createVideo, getVideos, getVideo, updateVideo, deleteVideo, createComment, getComments, likeVideo, viewVideo } = require('../controllers/videoController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();


// Upload Video
router.post('/', authMiddleware, createVideo)

// Get all videos
router.get('/', getVideos)

// Get single video by params
router.get('/:id', getVideo)

// Update video
router.put('/:id', authMiddleware, updateVideo)

//Delete video
router.delete('/:id', authMiddleware, deleteVideo)

// add Comment
router.post('/:id/comment', authMiddleware, createComment)

// get Comments
router.get('/:id/comments', authMiddleware, getComments)

// video like by user
router.post('/:id/like', authMiddleware, likeVideo);

router.post('/:id/view', authMiddleware, viewVideo)


module.exports = router;