const mongoose = require('mongoose');

const user = new mongoose.Schema({
    display_name: String,
    profileURL: String,
    image_url: String,
    followers: Number,
    country: String,
});

const User = mongoose.model('User', user);
module.exports = User;