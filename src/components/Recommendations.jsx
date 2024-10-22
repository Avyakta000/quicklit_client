"use client";
import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#36d7b7" size={100} />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Failed to load recommendations: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl p-5 bg-gray-900 rounded-md">
      <h1 className="mb-2 text-4xl p-2 text-center font-semibold text-gray-200/50">
        Your Personalized Recommendations
      </h1>

      {recommendations?.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No recommendations available. Please update your preferences.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="relative h-52 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  {item.title}
                </h2>
                <div
                  className="text-gray-600 text-sm overflow-hidden max-h-20"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
              <Link
                href={`recommendations/${item.slug}`}
                className="bg-blue-600 absolute left-4 bottom-4 text-white p-2 rounded-md"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
