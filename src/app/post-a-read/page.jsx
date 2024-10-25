"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategory,
  unselectCategory,
  selectTopic,
  unselectTopic,
  clearSelections,
} from "@/redux/features/categorySlice";
import Tiptap from "@/components/editor/Tiptap";
import { postRead, resetReadStatus } from "@/redux/features/readSlice";
import { redirect, useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { CustomAlert } from "@/components/Alert";

const PostRead = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, topics, selectedCategories, selectedTopics, status } =
    useSelector((state) => state.categories);
  const { status: readStatus, error: readError } = useSelector(
    (state) => state.reads
  );

  const [alert, setAlert] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopics] = useState([])
  const [coverImage, setCoverImage] = useState(null); // Cover image file state

  // Fetch categories and topics on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategories[0]?.id === category.id) {
      dispatch(unselectCategory(category));
    } else {
      dispatch(unselectCategory(selectedCategories[0]));
      dispatch(selectCategory(category));
    }
  };

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      dispatch(unselectTopic(topic));
    } else {
      dispatch(selectTopic(topic));
    }
  };

  // Handle image upload
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file); // Set uploaded file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form triggered");
    setAlert({
      type: "success",
      message: "Your read haas been sent successfully !!!",
    });
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categories", selectedCategories[0]?.id);
    selectedTopics.forEach((topic) => formData.append("topics", topic.id));
    // formData.append(
    //   "topics",
    //   // JSON.stringify(selectedTopics.map((topic) => parseInt(topic.id)))
    // );
    formData.append("content", content);
    if (coverImage) {
      console.log(coverImage, "cover image");
      formData.append("cover_image", coverImage); // File input for cover image
    }
    // To print form data
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    dispatch(postRead(formData));
  };

  useEffect(() => {
    // Check if the status is "success" and handle the redirection logic
    if (readStatus === "success") {
      console.log("submitted response");
      setAlert({
        type: "success",
        message: "Your read haas been sent successfully",
      });
      setContent("");
      setTitle("");
      setCoverImage(null);
      dispatch(clearSelections());
    }
  }, [readStatus, dispatch, router]);


  return (
    <>
      {status === "failed" && (
        <p className="text-red-500 text-center mt-6">
          Error fetching categories.
        </p>
      )}

      {readStatus === "failed" && (
        <p className="text-red-500 text-center mt-6">
          Error submitting post: {readError}
        </p>
      )}

      <div className="bg-gray-900 text-gray-200 rounded-lg mx-auto p-8 mt-6 mb-6 max-w-5xl shadow-xl">
        {status === "loading" && (
          <div className="flex justify-center items-center h-screen bg-gray-900">
            <PuffLoader color="#007bff" size={100} />
          </div>
        )}
        {alert && <CustomAlert {...alert} onDismiss={() => setAlert(null)} />}
        {status === "succeeded" && (
          <>
            <h1 className="text-center m-4 text-4xl font-bold text-white">
              Publish Your Post
            </h1>
            <div className="flex gap-8">
              {/* Categories Sidebar */}
              <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-200">
                  Select Category
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-4 py-2 rounded-lg transition duration-300 ${
                        selectedCategories.includes(category)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Content Area */}
              <div className="flex-1">
                {/* Topics Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-200">
                    Select Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic)}
                        className={`px-4 py-2 rounded-lg transition duration-300 ${
                          selectedTopics.includes(topic)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                      >
                        {topic.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Post Title, Cover Image, and Content */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Post Title"
                    className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  {/* Cover Image Upload */}
                  <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <label className="block text-lg font-medium mb-2 text-gray-300">
                      Upload Cover Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="w-full bg-gray-800 text-white p-2 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tiptap Editor for Content */}
                  <div className="border border-gray-600 bg-gray-800 text-black rounded-lg p-4">
                    <Tiptap setContent={setContent} />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
                      readStatus === "loading"
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={readStatus === "loading"}
                  >
                    {readStatus === "loading" ? "Submitting..." : "Publish"}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostRead;

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
//   const [isLoading, setIsLoading] = useState(false); // State to track loading

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(content, 'content');
//     setIsLoading(true); // Disable the button

//     const postData = {
//       title,
//       categories: [5], // or categories.split(',').map((cat) => cat.trim())
//       topics: [5], // or topics.split(',').map((topic) => topic.trim())
//       content,
//     };

//     dispatch(postRead(postData));
//     setIsLoading(false); // Re-enable the button
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
//           disabled={isLoading} // Disable the button when loading
//           className={`w-full py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 transition duration-200`}
//         >
//           {isLoading ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostRead;
// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic } from "@/redux/features/categorySlice"; // Import actions from Redux
// import Tiptap from "@/components/editor/Tiptap";
// import { postRead } from "@/redux/features/readSlice";

// const PostRead = () => {
//   const dispatch = useDispatch();
//   const { categories, selectedCategories, selectedTopics, status } = useSelector((state) => state.categories);

//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch categories from Redux store on component mount
//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchCategories());
//     }
//   }, [dispatch, status]);

//   // Handle category selection
//   const handleCategorySelect = (category) => {
//     if (selectedCategories.includes(category)) {
//       dispatch(unselectCategory(category));
//     } else {
//       dispatch(selectCategory(category));
//     }
//   };

//   // Handle topic selection
//   const handleTopicSelect = (topic) => {
//     if (selectedTopics.includes(topic)) {
//       dispatch(unselectTopic(topic));
//     } else {
//       dispatch(selectTopic(topic));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const postData = {
//       title,
//       categories: selectedCategories.map(cat => cat.id),
//       topics: selectedTopics.map(topic => topic.id),
//       content,
//     };

//     dispatch(postRead(postData));
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex max-w-4xl mx-auto p-8 mt-10">
//       {/* Left Sidebar for Categories */}
//       <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Categories</h2>
//         <div className="space-y-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => handleCategorySelect(category)}
//               className={`w-full text-left px-4 py-2 rounded-lg ${
//                 selectedCategories.includes(category)
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300'
//               } transition duration-300`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right Side: Topics and Content */}
//       <div className="w-3/4 ml-6">
//         {/* Topics */}
//         <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
//           <h2 className="text-lg font-semibold mb-4">Topics</h2>
//           <div className="flex flex-wrap gap-2">
//             {selectedCategories.length > 0 &&
//               selectedCategories[0].topics.map((topic) => (
//                 <button
//                   key={topic.id}
//                   onClick={() => handleTopicSelect(topic)}
//                   className={`px-4 py-2 rounded-lg ${
//                     selectedTopics.includes(topic)
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 hover:bg-gray-300'
//                   } transition duration-300`}
//                 >
//                   {topic.name}
//                 </button>
//               ))}
//           </div>
//         </div>

//         {/* Post Content */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Post Title"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//             required
//           />

//           <div className="border border-gray-300 rounded-lg p-4">
//             <Tiptap setContent={setContent} />
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-3 text-white font-semibold rounded-lg ${
//               isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
//             } transition duration-300`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Submitting...' : 'Submit Post'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostRead;
