const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://reedbarger.nyc3.digitaloceanspaces.com/default-avatar.png"
    },
    cover: {
        type: String,
        default: "https://reedbarger.nyc3.digitaloceanspaces.com/default-cover-banner.png"
    },
    about: {
        type: String,
        default: ""
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
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
    subscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subscribedTo: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'View'
        }
    ]
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password,this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;
