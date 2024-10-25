// "use client";

// import { TabItem } from "flowbite-react";
// import React from "react";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { preferences } = useSelector((state) => state.preferences);
//   console.log(user, " -- data user");
//   console.log(preferences, "preferences");

//   //   const user = {
//   //     name: "John Doe",
//   //     first_name: "johndoe",
//   //     email: "johndoe@example.com",
//   //     last_name: "Web Developer passionate about building responsive and user-friendly web applications.",
//   //     avatar: "https://via.placeholder.com/150",
//   //     joined: "January 2023",
//   //     socialLinks: {
//   //       github: "https://github.com/johndoe",
//   //       twitter: "https://twitter.com/johndoe",
//   //       linkedin: "https://linkedin.com/in/johndoe",
//   //     },
//   //   };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
//         <div className="flex items-center space-x-2">
//           <img
//             src={
//               "https://st3.depositphotos.com/3333565/19449/v/450/depositphotos_194499612-stock-illustration-artificial-intelligence-head-line-design.jpg"
//             }
//             alt="Profile Avatar"
//             className="w-12 h-12 rounded-full border-4 border-blue-500"
//           />
//           <div>
//             {/* <h1 className="text-lg font-bold ">{user?.first_name}</h1> */}
//             <p className="text-gray-300">
//               {user?.first_name} {user?.last_name}
//             </p>
//             <p className="text-gray-300 text-sm">{user?.email}</p>
//             {/* <p className="text-gray-500 italic">{user.joined}</p> */}
//           </div>
//         </div>
//       </div>

//       <div className="mt-2 max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
//         <h1 className="text-xl font-bold mb-4">Your Preferences</h1>

//         {preferences.map((preference, index) => (
//           <div key={index} className="mb-6">
//             {/* Display Category Names */}
//             <div className="mb-3">
//               <h2 className="text-lg font-semibold">Categories</h2>
//               {preference.category_names.length > 0 ? (
//                 <div className="flex space-x-2 mt-2">
//                   {preference.category_names.map((category, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white"
//                     >
//                       {category}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 italic">No categories available</p>
//               )}
//             </div>

//             {/* Display Topic Names */}
//             <div>
//               <h2 className="text-lg font-semibold">Topics</h2>
//               {preference.topic_names.length > 0 ? (
//                 <div className="flex space-x-2 mt-2">
//                   {preference.topic_names.map((topic, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-green-600 px-3 py-1 rounded-full text-sm text-white"
//                     >
//                       {topic}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 italic">No topics available</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-2 max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-xl font-bold ">{user?.first_name}</h1>
//           <p className="text-gray-300">
//             {user?.first_name} {user?.last_name}
//           </p>
//           <p className="text-gray-300">{user?.email}</p>
//           {/* <p className="text-gray-500 italic">{user.joined}</p> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { preferences } = useSelector((state) => state.preferences);

  const [activeTab, setActiveTab] = useState("preferences"); // Track active tab

  return (
    <>
      <div className=" mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
        <div className="flex items-center space-x-2">
          <img
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
              {preferences?.map((preference, index) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
