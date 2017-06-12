const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post_picture: String,
    comments: [{
        user: { type: Schema.ObjectId, ref: 'User' },
        comment: String,
        timestamp: { type: Date, default: Date.now }
    }],
    likes: [{
        user: { type: Schema.ObjectId, ref: 'User', unique: true }
    }],
    status: String
}, {
    timestamps: true
});

module.exports = function() {
    return PostSchema;
}