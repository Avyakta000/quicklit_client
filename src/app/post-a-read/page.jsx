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
} from "@/redux/features/categorySlice"; // Import actions from Redux
import Tiptap from "@/components/editor/Tiptap";
import { postRead, resetReadStatus } from "@/redux/features/readSlice";
import { useRouter } from "next/navigation";
import { PuffLoader } from 'react-spinners';

const PostRead = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories, topics, selectedCategories, selectedTopics, status } =
    useSelector((state) => state.categories);
  const { status: readStatus } = useSelector((state) => state.reads);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Fetch categories and topics from Redux store on component mount
  useEffect(() => {
    console.log("do something");
    if (status === "idle") {
      console.log("do nothing");
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (selectedCategories[0]?.id === category.id) {
      // If the clicked category is already selected, unselect it
      dispatch(unselectCategory(category));
    } else {
      // Set the newly selected category and clear the previous selection
      dispatch(unselectCategory(selectedCategories[0])); // Unselect the previous category
      dispatch(selectCategory(category)); // Select the new category
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      selectedCategories.map((cat) => cat.id),
      "selected cat"
    );
    console.log(
      selectedTopics.map((topic) => topic.id),
      "selected topic"
    );
    const postData = {
      title,
      categories: selectedCategories[0]?.id,
      topics: selectedTopics.map((topic) => topic.id),
      content,
    };

    dispatch(postRead(postData));
  };
  
  useEffect(() => {
    if (readStatus === "success") {
      dispatch(clearSelections())
      dispatch(resetReadStatus())
      router.push("/");
    }
  }, [router, readStatus, dispatch]);
  
  return (
    <>
      <h1 className="mt-4 text-center text-4xl font-bold text-gray-600">
        Publish Your Post here 
      </h1>
      {status === "loading" && (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader color="#36d7b7" size={100} />
        </div>
      )}
      {status === "failed" && <p>Error fetching categories.</p>}
      {status === "succeeded" && (
        <div className="flex max-w-4xl mx-auto mt-4">
          {/* Left Sidebar for Categories */}
          <div className="w-1/4 bg-gray-800 p-4 rounded mb-2">
            <h2 className="text-lg font-semibold text-white mb-4">
              Categories
            </h2>
            <div className="space-y-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition duration-300`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Topics and Content */}
          <div className="w-3/4 ml-6 mb-2">
            {/* Topics */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedTopics.includes(topic)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition duration-300`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <div className="border border-gray-300 rounded-lg p-4">
                <Tiptap setContent={setContent} />
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white font-semibold rounded-lg ${
                  readStatus === "loading"
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                } transition duration-300`}
                disabled={readStatus === "loading"}
              >
                {readStatus === "loading" ? "Submitting..." : "Publish"}
              </button>
            </form>
          </div>
        </div>
      )}
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
