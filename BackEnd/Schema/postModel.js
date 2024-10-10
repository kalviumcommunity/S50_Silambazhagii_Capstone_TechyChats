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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
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