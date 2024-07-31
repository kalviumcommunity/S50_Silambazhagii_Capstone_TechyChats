const express = require('express');
const router = express.Router();
const postModel = require('../Schema/postModel');

// GET endpoint to fetch all posts
router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

// GET endpoint to fetch a single post by ID
router.get('/getone/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST endpoint to upload an image along with other post data
router.post("/", async (req, res) => {
    try {
        const {title, description, story, author, image_url, category} = req.body;
        // Create a new post document
        const post = new postModel({title, description, story, author, image_url, category});

        // Save the post document to the database
        await post.save();

        // Return the created post
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/addcomment", async (req, res) => {
    try {
      const { postid, name, comment, profilepic } = req.body;
      const post = await Post.findById(postid);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      post.comments.push({ name, comment, profilepic });
  
      await post.save();
  
      res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// PUT endpoint to update a post by ID
router.put('/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, story, category, author, image_url } = req.body;
        const updateData = { title, description, story, category, author, image_url };
        console.log(updateData)

        const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE endpoint to delete a post by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await postModel.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
