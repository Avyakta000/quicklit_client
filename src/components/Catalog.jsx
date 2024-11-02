"use client";
import { fetchCategories } from "@/redux/features/categorySlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaBook,
  FaFlask,
  FaHistory,
  FaLaptopCode,
  FaPalette,
  FaMusic,
} from "react-icons/fa";
import Link from "next/link";

const Catalog = () => {
  const dispatch = useDispatch();
  const { categories, topics, status } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader text-blue-500">Loading...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          Failed to load categories and topics.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen mx-auto">

      <div
        className="relative bg-cover bg-center py-20 mb-12 rounded-lg"
        style={{
          backgroundImage:
            "url('https://media.defense.gov/2021/Aug/16/2002832104/1920/1080/0/210816-D-DV043-1001.JPG')",
        }}
      >
      {/* Hero Section */}
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
        <h2 className="relative text-5xl font-bold text-center text-white z-10">
          Explore Our Catalog
        </h2>
      </div>

      {/* Categories Section */}
      <div className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-lg p-6 shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <Link href={`/query?category=${category.slug}`} className="flex items-center space-x-3">
                {/* Icon Placeholder (Adjust icon based on category type if needed) */}
                <FaBook className="text-2xl" />
                <span className="text-lg font-semibold">{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mx-auto max-w-4xl">

       
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Popular Topics
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <Link
              href={`/query?tag=${topic.slug}`}
              key={topic.id}
              className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-full px-4 py-2 shadow-md font-semibold hover:scale-105 transform transition-all duration-300"
            >
              #{topic.name}
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Catalog;
