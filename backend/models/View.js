const mongoose = require('mongoose');
const { Schema } = mongoose;

const viewSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    }
});

const View = mongoose.model('View', viewSchema);
module.exports = View;
