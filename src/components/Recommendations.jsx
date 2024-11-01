"use client";

import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

const Recommendations = () => {
  const dispatch = useDispatch();
  const { recommendations, status, error } = useSelector(
    (state) => state.recommendations
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecommendations());
    }
  }, [dispatch, status]);


  return (
    <div className="w-full min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="mb-8 text-white text-4xl text-center font-extrabold text-transparent bg-clip-text">
        Your Personalized Recommendations
      </h1>

      {recommendations?.length === 0 ? (
        <div className="text-center text-lg text-gray-300">
          No recommendations available. Please update your preferences.
        </div>
      ) : (
        <div className="space-y-8">
          {recommendations.map((item) => (
            <Link
              key={item.id}
              href={`recommendations/${item.slug}`}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full p-6 border border-transparent transition-all duration-300 hover:border-blue-500 hover:shadow-neon"
            >
              {/* Use image as background if available */}
              <div
                className="w-full sm:w-1/3 h-64 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url(${item.cover_image || "https://flowbite.com/docs/images/examples/image-1@2x.jpg"})`,
                }}
              />

              {/* Text Content */}
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {item.created_at} by {item.author_full_name}
                </p>

                {/* Render the HTML content preview */}
                <div
                  className="text-sm text-gray-300 max-h-24 overflow-hidden leading-snug"
                  dangerouslySetInnerHTML={{
                    __html:
                      item.content.length > 200
                        ? item.content.substring(0, 200) + "..."
                        : item.content,
                  }}
                />

                {/* Read more button */}
                <div className="mt-4 text-blue-400 hover:underline">
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
