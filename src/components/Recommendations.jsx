"use client";
import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Recommendations = () => {
  const dispatch = useDispatch();
  const { recommendations, status, error } = useSelector(
    (state) => state.recommendations
  );

  useEffect(() => {
      console.log(status, 'status')
    if (status=='idle'){
        console.log(status, 'idle')
        dispatch(fetchRecommendations());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">
          Loading recommendations...
        </div>
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
    <div className="max-w-xl mx-auto bg-gray-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Your Personalized Recommendations
      </h1>

      {recommendations?.length === 0 ? (
        <div className="text-center text-md text-gray-600">
          No recommendations available. Please update your preferences.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="relative h-40 border border-[3px] border-white rounded-md overflow-hidden group"
            >
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <div
                  className="prose text-[15px]"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore More
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
