const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoLikeSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    }
});

const VideoLike = mongoose.model('VideoLike', videoLikeSchema);
module.exports = VideoLike;
