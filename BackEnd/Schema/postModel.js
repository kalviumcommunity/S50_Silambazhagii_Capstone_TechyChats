const mongoose = require('mongoose');


const commentsSchema = new mongoose.Schema({
    name: String,
    message: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    postedTime: {
      type: Date,
      default: Date.now
    }
});

// const postSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     story: String,
//     likes: Number,
//     image_url: String,
//     video: String,
//     category: String,
//     author: String,
//  // Added the comments array
// });


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
        type: String,
    },
    video: {
        type: String,
    },
    category: {
        type: String,
    },
    author: {
        type: String,
    },
    comments: [commentsSchema]
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;