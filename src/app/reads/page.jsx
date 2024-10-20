"use client"; // Mark as a Client Component

import { fetchReads } from "@/redux/features/readSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReadPage = () => {
  const dispatch = useDispatch();
  const { reads, loading, error } = useSelector((state) => state.reads);

  // Use useEffect to fetch reads only if reads are empty
  useEffect(() => {
    if (reads.length === 0) {
      dispatch(fetchReads());
    }
  }, [dispatch, reads.length]); // Add reads.length as a dependency

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  return (
    <div className="bg-gray-100 py-6">
      <div className="mx-auto max-w-lg">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">All Reads</h1>
          <p className="text-gray-600 mt-2">
            Sharing my thoughts and experiences.
          </p>
        </header>

        <div className="space-y-4">
          {reads.map((read) => (
            <ReadCard key={read.id} read={read} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ReadCard Component to handle individual read item display
const ReadCard = ({ read }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state
  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  // Limit the number of characters to show initially
  const contentLimit = 200; // Adjust the character limit as needed
  const hasMoreContent = read.content.length > contentLimit;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {read?.images.length > 0 && (
        <img
          src={read.images[0].image}
          alt={read.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800 mt-2">
        {read.title}
      </h2>
      <p className="text-gray-500 text-sm">
        {read.created_at} by {read.author_full_name}
      </p>

      {/* Render truncated or full content based on isExpanded state */}
      <div className="prose">
        <div
          dangerouslySetInnerHTML={{
            __html: isExpanded ? read.content : `${read.content.slice(0, contentLimit)}...`,
          }}
        />
      </div>

      {/* Show "Read More" button if content is truncated */}
      {hasMoreContent && (
        <button
          onClick={toggleContent}
          className="mt-2 text-blue-600 hover:underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      <div className="flex justify-between mt-4">
        <Link
          href={`/reads/${read.slug}`} // Use slug for better SEO
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Read More
        </Link>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-blue-600">
            👍 Like
          </button>
          <button className="text-gray-500 hover:text-blue-600">
            💬 Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadPage;
