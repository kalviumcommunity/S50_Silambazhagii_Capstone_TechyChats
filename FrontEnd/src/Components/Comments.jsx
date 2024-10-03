import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import profile_img from "../assets/profile.jpeg";

function Comments({ post, onClose }) {
  const userId = Cookies.get('userId').replace(/"/g, '');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the post
    axios.get(`http://localhost:3000/posts/${post._id}/comments`)
      .then(response => {
        console.log(response.data); // Log the comments to see their structure
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [post._id]);
  

  const handleAddComment = () => {
    if (newComment.trim()) {
      axios.post(`http://localhost:3000/posts/${post._id}/comments`, {
        profile: userId,
        message: newComment,
      })
      .then(response => {
        setComments(prevComments => [...prevComments, response.data]);
        setNewComment(''); // Clear the input field
      })
      .catch(error => console.error('Error adding comment:', error));
    }
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:3000/posts/${post._id}/comments/${commentId}`)
      .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  const formatTime = (timestamp) => {
    // Check if timestamp is a valid date
    const commentDate = new Date(timestamp);
    
    if (isNaN(commentDate)) {
      console.error('Invalid date:', timestamp);
      return 'Invalid date'; // Handle invalid date
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
  
    // If posted within the last minute
    if (diffInSeconds < 60) {
      return 'Posted just now';
    } else {
      // Format the date and time
      const options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return commentDate.toLocaleTimeString([], options); // e.g., "2:00 PM"
    }
  };
  

  return (
    <center className="w-[60vh] rounded-full top-0 left-0 h-full flex items-end justify-center bg-black bg-opacity-50">
      <div className="w-full rounded-3xl rounded-b-none border-2 text-left bg-white border-gray-600 p-4 mx-auto max-w-xl animate-slideUp">
        <div className="flex justify-between items-center">
          <h3 className="poppins text-2xl font-semibold">Comments</h3>
          <button
            className="text-gray-800 hover:text-red-600 flex justify-center items-center text-4xl mb-1 h-12 w-12 hover:bg-gray-100 rounded-full transition"
            onClick={onClose}
          >
            <span className="mb-1 close-button">&times;</span>
          </button>
        </div>

        <div className='overflow-x-scroll h-[60vh] bg-gray-100 p-1 px-4 rounded-xl'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="flex mt-5 p-2 rounded-lg bg-white" key={comment._id}>
                <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                  <img className="h-12 w-12 rounded-full object-cover" src={profile_img || "https://via.placeholder.com/150"} alt="" />
                </div>
                <div className="ml-3 w-full">
                  <div className="h-6 flex justify-between items-center">
                    <div className="font-medium text-sm poppins text-gray-800">
                      {comment.name}
                    </div>
                    {comment.profile === userId && (
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="poppins text-xs text-gray-500">
                    {formatTime(comment.createdAt)} {/* Use the appropriate field for the timestamp */}
                  </div>
                  <div className="mt-1 poppins text-black">{comment.message}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center mt-12">
              <h1 className="poppins text-gray">Be the first to comment.</h1>
            </div>
          )}
        </div>

        <form className="mt-4 flex justify-between items-center">
          <input
            id="comment"
            name="comment"
            className="border-2 border-gray-800 p-2 w-full rounded-full placeholder:text-sm placeholder:pl-2"
            required
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddComment}
            className="ml-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </center>
  );
}

export default Comments;
