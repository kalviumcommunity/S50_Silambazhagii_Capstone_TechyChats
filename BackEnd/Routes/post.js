const express = require('express');
const router = express.Router();
const postModel = require('../Schema/postModel');
const multer = require("multer");

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
});

// Increase the file size limit to handle larger images (adjust as necessary)
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20 // 20 MB (adjust as necessary)
    }
});

// GET endpoint to fetch all posts
router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        const postsWithBase64Images = posts.map(post => {
            const base64Image = post.image_url.toString('base64');
            return {
                ...post._doc,
                image_url: base64Image
            };
        });
        res.status(200).json(postsWithBase64Images);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

// Define a route to get a single post by ID
router.get('/getone/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const base64Image = post.image_url.toString('base64');
        const postWithBase64Image = {
            ...post._doc,
            image_url: base64Image
        };
        res.json(postWithBase64Image);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST endpoint to upload an image along with other post data
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, story, category, author } = req.body;
        const imageBuffer = Buffer.from(req.file.buffer, "utf-8");

        // Create a new post document
        const post = new postModel({
            title,
            description,
            story,
            image_url: imageBuffer,
            category: "",
            author
        });

        // Save the post document to the database
        await post.save();

        // Return the created post
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT endpoint to update a post by ID
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, story, category, author } = req.body;
        const updateData = { title, description, story, category, author };

        if (req.file) {
            const imageBuffer = Buffer.from(req.file.buffer, "utf-8");
            updateData.image_url = imageBuffer;
        }

        const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const base64Image = updatedPost.image_url.toString('base64');
        const postWithBase64Image = {
            ...updatedPost._doc,
            image_url: base64Image
        };

        res.status(200).json(postWithBase64Image);
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
