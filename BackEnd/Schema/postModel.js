const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    story: {
        type: String,
    },
    likes: {
        type: Number,
    },
    image_url: {
        type: Buffer,
    },
    category: {
        type: String,
    },
    author: {
        type: String,
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

