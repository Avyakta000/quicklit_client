// components/CommentSystem.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "@/hooks/useWebSocket"; // Adjust the path
import { FaRegCommentDots, FaRegThumbsUp, FaEllipsisH } from "react-icons/fa";
import { fetchComments, addComment as addCommentAction, editComment, deleteComment } from "@/redux/features/commentsSlice";

const CommentSystem = ({ readId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // WebSocket URL
  const socketUrl = `ws://localhost:8000/ws/comments/${readId}/`;

  // Handle incoming WebSocket messages
  const handleIncomingMessage = (data) => {
    if (data.action === 'add') {
      dispatch(addCommentAction(data.comment));
    } else if (data.action === 'edit') {
      dispatch(editComment({ id: data.comment.id, comment: { text: data.comment.text } }));
    } else if (data.action === 'delete') {
      dispatch(deleteComment(data.comment.id));
    }
  };

  // Use WebSocket for real-time comment updates
  useWebSocket(socketUrl, handleIncomingMessage);

  useEffect(() => {
    dispatch(fetchComments(readId)); // Fetch comments on component mount
  }, [dispatch, readId]);

  const handleAddComment = async () => {
    if (!newComment) return;
    const comment = { blog: readId, text: newComment };
    await dispatch(addCommentAction(comment)); // Add the comment to the server
    setNewComment("");
  };

  const handleEditComment = async () => {
    if (!editingCommentText) return;
    await dispatch(editComment({ id: editingCommentId, comment: { text: editingCommentText } }));
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleDeleteComment = async (id) => {
    await dispatch(deleteComment(id)); // Dispatch delete action
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error fetching comments: {error}</div>;

  return (
    <div className="bg-gray-900 border-2 border-white text-white p-2">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Post Comment
        </button>
      </div>

      <CommentList
        comments={comments}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        editingCommentId={editingCommentId}
        editingCommentText={editingCommentText}
        setEditingCommentText={setEditingCommentText}
        setEditingCommentId={setEditingCommentId}
      />
    </div>
  );
};

const CommentList = ({
  comments,
  handleEditComment,
  handleDeleteComment,
  editingCommentId,
  editingCommentText,
  setEditingCommentText,
  setEditingCommentId,
}) => (
  <ul className="space-y-4">
    {comments.map((comment) => (
      <li key={comment.id}>
        <Comment
          comment={comment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          isEditing={editingCommentId === comment.id}
          editingCommentText={editingCommentText}
          setEditingCommentText={setEditingCommentText}
          setEditingCommentId={setEditingCommentId}
        />
      </li>
    ))}
  </ul>
);

const Comment = ({
  comment,
  handleEditComment,
  handleDeleteComment,
  isEditing,
  editingCommentText,
  setEditingCommentText,
  setEditingCommentId,
}) => (
  <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
    <div className="flex justify-between items-center">
      <span className="font-bold">{comment.author.full_name}</span>
      <FaEllipsisH className="text-gray-500" />
    </div>
    {isEditing ? (
      <div>
        <input
          type="text"
          value={editingCommentText}
          onChange={(e) => setEditingCommentText(e.target.value)}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none"
        />
        <button
          onClick={handleEditComment}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    ) : (
      <p className="mt-2 text-gray-300">{comment.text}</p>
    )}
    <div className="flex space-x-4 text-sm text-gray-400 mt-4">
      <button className="flex items-center space-x-1 hover:text-blue-400">
        <FaRegThumbsUp /> <span>Like</span>
      </button>
      <button
        onClick={() => {
          setEditingCommentId(comment.id);
          setEditingCommentText(comment.text);
        }}
        className="flex items-center space-x-1 hover:text-blue-400"
      >
        <FaRegCommentDots /> <span>Edit</span>
      </button>
      <button
        onClick={() => handleDeleteComment(comment.id)}
        className="flex items-center space-x-1 hover:text-red-500"
      >
        <span>Delete</span>
      </button>
    </div>
  </div>
);

export default CommentSystem;
