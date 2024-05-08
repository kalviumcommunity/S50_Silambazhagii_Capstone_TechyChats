const express = require('express');
const router = express.Router(); 
const postModel = require('../Schema/postModel');
const multer = require("multer");
const fs = require("fs");

// GET endpoint to fetch all posts
router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        const postsWithBase64Images = posts.map(post => {
          const base64Image = post.image_url.toString('base64');
      
          // Construct the response object with the base64 image URL
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
      // Extract post ID from request parameters
      const postId = req.params.id;
      
      // Query the database to find the post by its ID
      const post = await postModel.findById(postId);
      
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Convert the image URL to a base64 string
      const base64Image = post.image_url.toString('base64');
      
      // Construct the response object with the base64 image URL
      const postWithBase64Image = {
        ...post._doc, 
        image_url: base64Image
      };
  
      // Return the post details with the base64 image URL
      res.json(postWithBase64Image);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Internal server error' });
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
            story : story,
            image_url: imageBuffer,
            category : "",
            author : author
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
