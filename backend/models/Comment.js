const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    text: { 
      type: String, 
      required: true 
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
