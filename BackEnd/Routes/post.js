const express = require("express");
const router = express.Router();
const postModel = require("../Schema/postModel");
const userModel = require("../Schema/userModel");

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
router.get("/getone/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to upload an image along with other post data
router.post("/", async (req, res) => {
  try {
    const { title, description, story, author, image_url, category } = req.body;
    // Create a new post document
    const post = new postModel({
      title,
      description,
      story,
      author,
      image_url,
      category,
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

router.get("/:id/comments", async (req, res) => {
  try {
    const postId = req.params.id
    console.log(postId)
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = post.comments
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

router.post("/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const { message, profile, postedTime } = req.body;
    console.log(req.body)

  
  const user = await userModel.findById(profile);
  if (!user) return res.status(404).json({ message: "User not found" });
  
  console.log(postedTime)
  const post = await postModel.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  
  post.comments.push({ name: user.name, message, profile, postedTime });
  await post.save();
  res.status(200).json({ name: user.name, message, profile, postedTime });
});

// DELETE endpoint to delete a comment from a post
router.delete("/:postId/comments/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;
  
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find and remove the comment from the post
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    post.comments.splice(commentIndex, 1);  // Remove comment from array
    await post.save();  // Save the updated post

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// router.post("/addcomment", async (req, res) => {
//     try {
//       const { postid, name, comment, profilepic } = req.body;
//       const post = await Post.findById(postid);

//       if (!post) {
//         return res.status(404).json({ error: "Post not found" });
//       }

//       post.comments.push({ name, comment, profilepic });

//       await post.save();

//       res.status(200).json({ message: "Comment added successfully" });
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   router.post("/addcomment", async (req, res) => {
//     try {
//         const { postid, name, message, profile } = req.body;  // Fixed the field names
//         const post = await Post.findById(postid);

//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         // Add new comment to the post
//         post.comments.push({ name, message, profile });

//         // Save the updated post
//         await post.save();

//         res.status(200).json({ message: "Comment added successfully" });
//     } catch (error) {
//         console.error("Error adding comment:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// PUT endpoint to like/unlike a post
router.put("/like/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { isLiked } = req.body;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (isLiked) {
      post.likesCount += 1;
      post.isLiked = true;
    } else {
      post.likesCount -= 1;
      post.isLiked = false;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports =
  // PUT endpoint to update a post by ID
  router.put("/update/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, description, story, category, author, image_url } =
        req.body;
      const updateData = {
        title,
        description,
        story,
        category,
        author,
        image_url,
      };
      console.log(updateData);

      const updatedPost = await postModel.findByIdAndUpdate(
        postId,
        updateData,
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// DELETE endpoint to delete a post by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await postModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
