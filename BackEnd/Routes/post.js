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

router.post('/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const userId = req.body.userId; // Assuming you send userId in the request body

  try {
      const post = await postModel.findById(postId);

      // Check if user has already liked the post
      if (post.likedBy.includes(userId)) {
          return res.status(400).json({ message: 'You have already liked this post' });
      }

      // Update the like count and the list of users who liked the post
      post.likes += 1; 
      post.likedBy.push(userId);
      await post.save();

      res.json({ likes: post.likes, message: 'Post liked successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
  }
});


// PUT endpoint to like/unlike a post
// router.put("/like/:postId", async (req, res) => {
//   const postId = req.params.postId; // Ensure this matches your URL parameter
//   const { isLiked, userId } = req.body;

//   try {
//     const post = await postModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     if (isLiked) {
//       // If the post is liked, check if the user has already liked it
//       if (!post.likedBy.includes(userId)) {
//         post.likesCount += 1;
//         post.likedBy.push(userId);
//       }
//     } else {
//       // If the post is unliked, check if the user has liked it
//       if (post.likedBy.includes(userId)) {
//         post.likesCount -= 1;
//         post.likedBy = post.likedBy.filter(id => id !== userId); // Remove userId from likedBy
//       }
//     }

//     await post.save();
//     res.json({ likesCount: post.likesCount, likedBy: post.likedBy });
//   } catch (error) {
//     console.error("Error updating like status:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



router.patch("/like/:id", async (req, res) => {
  const postId = req.params.id;
  const { action, userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let updatedPost;
    
    if (action === "like") {
      if (!post.likes.includes(userId)) {
        updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { $addToSet: { likes: userId } },
          { new: true }
        )


        console.log("added like");
      } else {
        return res.status(400).json({ message: "You already liked this post" });
      }
    } else if (action === "unlike") {
      if (post.likes.includes(userId)) {
        updatedPost = await postModel.findByIdAndUpdate(
          postId,
          { $pull: { likes: userId } },
          { new: true }
        )

        console.log("removed like");
      } else {
        return res.status(400).json({ message: "You haven't liked this post" });
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const responseData = {
      likes: updatedPost.likes,
    };
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




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
