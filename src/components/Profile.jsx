"use client";

import { setUser } from "@/redux/features/userAuth";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { preferences, status } = useSelector((state) => state.preferences);
  // console.log(user, 'profile')
  const [activeTab, setActiveTab] = useState("preferences"); // Track active tab
  
  return (
    <>
      <div className=" mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            width={20}
            height={20}
            src="https://st3.depositphotos.com/3333565/19449/v/450/depositphotos_194499612-stock-illustration-artificial-intelligence-head-line-design.jpg"
            alt="Profile Avatar"
            className="w-12 h-12 rounded-full border-4 border-blue-500"
          />
          <div>
            <p className="text-gray-300">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-gray-300 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-2 mx-auto">
        <nav className="flex space-x-2 border-b-2 mb-1 border-gray-700">
          <button
            onClick={() => setActiveTab("preferences")}
            className={`py-3 px-4 text-sm font-medium rounded-t-md ${
              activeTab === "preferences"
                ? "bg-blue-600 text-white"
                : "text-gray-400 font-semibold hover:text-blue-600"
            }`}
          >
            Preferences
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 text-sm font-medium rounded-t-md ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "text-gray-400 font-semibold hover:text-blue-600"
            }`}
          >
            Edit info
          </button>
        </nav>

        {/* Tab Content */}
        <div className="p-6 bg-gray-800 text-white rounded-b-lg shadow-lg">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Profile Information
              </h2>
              <p className="text-gray-300">
                <span className="font-medium">Name: </span>
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email: </span>
                {user?.email}
              </p>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Preferences</h2>
              {Array.isArray(preferences) && preferences.length > 0 ? (preferences?.map((preference, index) => (
                <div key={index} className="mb-6">
                  <div className="mb-3">
                    <h2 className="text-md font-semibold">Categories</h2>
                    {preference.category_names.length > 0 ? (
                      <div className="flex space-x-2 mt-2">
                        {preference.category_names.map((category, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">
                        No categories available
                      </p>
                    )}
                  </div>

                  <div>
                    <h2 className="text-md font-semibold">Topics</h2>
                    {preference.topic_names.length > 0 ? (
                      <div className="flex space-x-2 mt-2">
                        {preference.topic_names.map((topic, idx) => (
                          <span
                            key={idx}
                            className="bg-green-600 px-3 py-1 rounded-full text-sm text-white"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">
                        No topics available
                      </p>
                    )}
                  </div>
                </div>
              ))) : (
                <p>No preferences found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
