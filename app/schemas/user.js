const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.Types.ObjectId;

var UserSchema = new Schema({
    name: String,
    password: String,
    username: { type: String, lowercase: true, index: true, unique: true },
    email: String,
    profile_image: String,
    followers: [{ type: Schema.ObjectId, ref: 'User', unique: true, index: true }],
    following: [{ type: Schema.ObjectId, ref: 'User', unique: true, index: true }]
});

module.exports = function() {
    return UserSchema;
}