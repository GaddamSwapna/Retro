import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShareAlt, FaFlag, FaTwitter, FaFacebook, FaLink, FaTimes } from "react-icons/fa";

function Chathub() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(null);

  // Example user roles
  const userRole = "moderator"; // change this to "user" for regular users

  // Function to add a new post
  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        likes: 0,
        comments: [],
        flagged: false, // Flagging status
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  // Function to handle comment submission
  const addComment = (postId) => {
    if (newComment.trim()) {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { content: newComment }],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComment("");
      setShowCommentInput(null);
    }
  };

  // Function to handle liking a post
  const likePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to flag a post as inappropriate
  const flagPost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, flagged: true };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFlaggedPosts([...flaggedPosts, postId]); // Add to flagged posts
  };

  // Function to remove flagged post
  const removeFlaggedPost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setFlaggedPosts(flaggedPosts.filter((id) => id !== postId)); // Remove from flagged list
  };

  // Function to share post link
  const sharePost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    const postLink = `${window.location.href}?postId=${postId}`;
    navigator.clipboard.writeText(postLink).then(() => {
      alert("Post link copied to clipboard!");
    });
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6 transition-all duration-300 hover:text-yellow-500">Retro Gaming Forum</h1>

      {/* New Post Input */}
      <div className="mb-6">
        <textarea
          className="w-full p-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 hover:border-blue-500"
          placeholder="What are your thoughts on retro gaming today?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={addPost}
          className="bg-blue-600 text-white px-6 py-3 mt-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
        >
          Post
        </button>
      </div>

      {/* Posts Display */}
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`bg-white p-6 shadow-lg rounded-lg mb-4 transition-all duration-300 ${
              post.flagged ? "border-4 border-red-600 animate-pulse" : "hover:border-2 hover:border-blue-400"
            }`}
          >
            <p className="font-semibold text-gray-800">{post.content}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => likePost(post.id)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-green-400 transition-all duration-200"
              >
                <FaThumbsUp className="inline-block mr-2" />
                Like {post.likes}
              </button>
              <button
                onClick={() => setShowCommentInput(post.id)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-gray-400 transition-all duration-200"
              >
                <FaComment className="inline-block mr-2" />
                Comment
              </button>
              <button
                onClick={() => setShowShareModal(post.id)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-200"
              >
                <FaShareAlt className="inline-block mr-2" />
                Share
              </button>
              {!post.flagged && userRole === "moderator" && (
                <button
                  onClick={() => flagPost(post.id)}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg ml-4 hover:bg-yellow-400 transition-all duration-200"
                >
                  <FaFlag className="inline-block mr-2" />
                  Flag
                </button>
              )}
            </div>

            {/* Show Comments Input */}
            {showCommentInput === post.id && (
              <div className="mt-4">
                <textarea
                  className="w-full p-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="bg-blue-600 text-white px-6 py-3 mt-2 rounded-lg hover:bg-blue-500 transition-all duration-200"
                >
                  Submit Comment
                </button>
              </div>
            )}

            {/* Comments Display */}
            {post.comments.length > 0 && (
              <div className="mt-4">
                {post.comments.map((comment, index) => (
                  <p key={index} className="ml-4 text-gray-600">
                    - {comment.content}
                  </p>
                ))}
              </div>
            )}

            {/* Remove flagged post (for moderator) */}
            {post.flagged && userRole === "moderator" && (
              <div className="mt-4">
                <button
                  onClick={() => removeFlaggedPost(post.id)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-all duration-200"
                >
                  Remove Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share Modal (for Share Button) */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <div className="flex justify-end">
              <button
                onClick={() => setShowShareModal(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Share this Post</h2>
            <div className="flex justify-center space-x-8">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}?postId=${showShareModal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-3xl hover:text-blue-700"
              >
                <FaTwitter />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}?postId=${showShareModal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-3xl hover:text-blue-800"
              >
                <FaFacebook />
              </a>
              <FaLink
                className="text-gray-600 text-3xl cursor-pointer hover:text-gray-800"
                onClick={() => sharePost(showShareModal)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Moderator Dashboard */}
      {userRole === "moderator" && (
        <div className="mt-8 p-6 border border-yellow-500 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Moderator Dashboard</h2>
          <p className="mb-4 text-gray-600">Flagged Posts:</p>
          <ul>
            {flaggedPosts.length > 0 ? (
              flaggedPosts.map((postId) => {
                const post = posts.find((p) => p.id === postId);
                return (
                  <li key={postId} className="bg-gray-200 p-4 rounded-lg mb-2 transition-all duration-200 hover:bg-gray-300">
                    <p>{post.content}</p>
                    <button
                      onClick={() => removeFlaggedPost(postId)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg mt-2 hover:bg-red-500 transition-all duration-200"
                    >
                      Remove Post
                    </button>
                  </li>
                );
              })
            ) : (
              <p>No flagged posts</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Chathub;
