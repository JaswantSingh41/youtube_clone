const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoLikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'VideoLike'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'View'
        }
    ]
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
