"use client";

import Tiptap from '@/components/editor/Tiptap';
import { postRead } from '@/redux/features/readSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PostRead = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [topics, setTopics] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content, 'content');
    setIsLoading(true); // Disable the button

    const postData = {
      title,
      categories: [5], // or categories.split(',').map((cat) => cat.trim())
      topics: [5], // or topics.split(',').map((topic) => topic.trim())
      content,
    };

    await dispatch(postRead(postData));
    setIsLoading(false); // Re-enable the button
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Topics (comma separated)"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="border border-gray-300 rounded-md mb-4">
          <Tiptap setContent={setContent} />
        </div>
        <button
          type="submit"
          disabled={isLoading} // Disable the button when loading
          className={`w-full py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 transition duration-200`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PostRead;

// its working but data submitting twice
// "use client";

// import Tiptap from '@/components/editor/Tiptap';
// import { postRead } from '@/redux/features/readSlice';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// const PostRead = () => {
//   const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [categories, setCategories] = useState('');
//   const [topics, setTopics] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(content,'content')
//     const postData = {
//       title,
//       categories: [5], // categories.split(',').map((cat) => cat.trim()), // Trim whitespace
//       topics: [5],//topics.split(',').map((topic) => topic.trim()), // Trim whitespace
//       content,
//     };

//     await dispatch(postRead(postData));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Categories (comma separated)"
//             value={categories}
//             onChange={(e) => setCategories(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Topics (comma separated)"
//             value={topics}
//             onChange={(e) => setTopics(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border border-gray-300 rounded-md mb-4">
//           <Tiptap setContent={setContent} />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostRead;

// import Tiptap from '@/components/editor/Tiptap';

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postRead } from '../slices/postRead'; // Adjust the import based on your file structure
// import Tiptap from './Tiptap'; // Your Tiptap component

// const PostRead = () => {
//     const dispatch = useDispatch();
//   const [title, setTitle] = useState('');
//   const [categories, setCategories] = useState('');
//   const [topics, setTopics] = useState('');
//   const [content, setContent] = useState(''); // Assuming you're using this for editor content
  
//   const handleSubmit = async (e) => {
//       e.preventDefault();

//     // Prepare the data to send
//     const postData = {
//       title,
//       categories: categories.split(','), // Assuming categories are comma-separated
//       topics: topics.split(','), // Assuming topics are comma-separated
//       content,
//     };

//     // Dispatch action to send data to the backend
//     await dispatch(postRead(postData)); // Make sure postRead is an async thunk action
// };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//         />
//       <input
//         type="text"
//         placeholder="Categories (comma separated)"
//         value={categories}
//         onChange={(e) => setCategories(e.target.value)}
//         />
//       <input
//         type="text"
//         placeholder="Topics (comma separated)"
//         value={topics}
//         onChange={(e) => setTopics(e.target.value)}
//         />
//       <Tiptap setContent={setContent} /> {/* Pass the setContent function to Tiptap */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default PostRead;

// import React from 'react'

// const PostRead = () => {
//   return (
//     <div className='container'>
//         <Tiptap/>
//     </div>
//   )
// }

// export default PostRead


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postRead } from "@/redux/features/readSlice";
// import Editor from "@/components/editor/Editor";

// const PostRead = () => {
    //   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.reads);
//   const [title, setTitle] = useState("");
//   const [categories, setCategories] = useState("");
//   const [topics, setTopics] = useState("");


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       title,
//       content: 
//       categories: categories.split(",").map((cat) => cat.trim()),
//       topics: topics.split(",").map((top) => top.trim()),
//     };

//     // Dispatch the postRead thunk
//     dispatch(postRead(data));
//     // Optionally reset the form fields after posting
//     setTitle("");
//     setCategories("");
//     setTopics("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-6">
//       <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
//         {loading && <p className="text-blue-500">Loading...</p>}
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <h1 className="text-3xl font-semibold text-gray-700 mb-6">
//           Post a New Read
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6 text-black">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter your title"
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
//             required
//           />
//           <input
//             type="text"
//             value={categories}
//             onChange={(e) => setCategories(e.target.value)}
//             placeholder="Categories (comma-separated)"
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
//             required
//           />
//           <input
//             type="text"
//             value={topics}
//             onChange={(e) => setTopics(e.target.value)}
//             placeholder="Topics (comma-separated)"
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
//             required
//           />
//           <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
//           <Editor content={content}/>           
//           </div>
//           <button
//             type="submit"
//             className="w-full p-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
//           >
//             Post Read
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostRead;
