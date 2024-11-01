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
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categories", selectedCategories[0]?.id);
    selectedTopics.forEach((topic) => formData.append("topics", topic.id));
   
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
    setAlert({
      type: "success",
      message: "Your read haas been sent successfully !!!",
    });
  };

  useEffect(() => {
    // Check if the status is "success" and handle the redirection logic
    if (readStatus === "success") {
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
