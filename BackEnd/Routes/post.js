const express = require('express');
const router = express.Router(); 
const postModel = require('../Schema/postModel');
const multer = require("multer");
const fs = require("fs");

// Multer storage configuration


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
    
        res.status(200).json(postsWithBase64Images);    } catch (error) {
        console.log(error); 
        res.status(500).send("An error occurred");
    }
});

// POST endpoint to create a new post
router.post("/posts", async (req, res) => {
    try {
        const data = await postModel.create(req.body);
        console.log(data)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
});

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
});
const upload = multer({ storage: storage });
// POST endpoint to upload an image along with other post data
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, story, category, author } = req.body;
        const imageBuffer =  Buffer.from(req.file.buffer, "utf-8");
        
        // Create a new post document
        const post = new postModel({
            title,
            description,
            story : "",
            image_url: imageBuffer,
            category : "",
            author : "" 
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

module.exports = router;
