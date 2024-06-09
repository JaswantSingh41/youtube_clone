const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    subscriberId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscribedToId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
