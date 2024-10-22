"use client";

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {

    const user = useSelector(
        (state) => state.auth.user.user
      );

      console.log(user, ' -- data user')

//   const user = {
//     name: "John Doe",
//     first_name: "johndoe",
//     email: "johndoe@example.com",
//     last_name: "Web Developer passionate about building responsive and user-friendly web applications.",
//     avatar: "https://via.placeholder.com/150",
//     joined: "January 2023",
//     socialLinks: {
//       github: "https://github.com/johndoe",
//       twitter: "https://twitter.com/johndoe",
//       linkedin: "https://linkedin.com/in/johndoe",
//     },
//   };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={"https://st3.depositphotos.com/3333565/19449/v/450/depositphotos_194499612-stock-illustration-artificial-intelligence-head-line-design.jpg"}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-xl font-bold ">{user?.first_name}</h1>
          <p className="text-gray-300">{user?.first_name} {user?.last_name}</p>
          <p className="text-gray-300">{user?.email}</p>
          {/* <p className="text-gray-500 italic">{user.joined}</p> */}
        </div>
      </div>

     
      {/* <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Social Links</h2>
        <div className="flex space-x-4 mt-2">
          <a
            href={user?.socialLinks?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={user?.socialLinks?.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            Twitter
          </a>
          <a
            href={user?.socialLinks?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div> */}

    </div>
  );
};

export default Profile;
