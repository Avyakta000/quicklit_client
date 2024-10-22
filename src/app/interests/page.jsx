"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic, clearSelections } from '@/redux/features/categorySlice';
import { useRouter } from 'next/navigation';
import { savePreferences } from '@/redux/features/preferenceSlice';
import { PuffLoader } from 'react-spinners';
import { CustomAlert } from '@/components/Alert';

const CategorySelection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [alert, setAlert] = useState(null); 
  const { categories, topics, selectedCategories, selectedTopics, status, error } = useSelector((state) => state.categories);
  const { status:statusPreferences, error:errorPreferences } = useSelector((state) => state.preferences);
  
  const [showTopics, setShowTopics] = useState(false); // Toggle between categories and topics view

  useEffect(() => {
    if(status==="idle"){
      dispatch(fetchCategories());
    }
  }, [status]);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      dispatch(unselectCategory(category));
    } else {
      dispatch(selectCategory(category));
    }
  };

  const handleSelectTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      dispatch(unselectTopic(topic));
    } else {
      dispatch(selectTopic(topic));
    }
  };

  // Toggle to show topics view
  const handleContinue = () => {
    setShowTopics(true); // Show topics after category selection
  };

  // Go back to categories view
  const handleBack = () => {
    setShowTopics(false); // Show categories view again
  };

  const handleSubmit = async () => {
    const selectedCategoryIds = selectedCategories.map(category => category.id);
    const selectedTopicIds = selectedTopics.map(topic => topic.id);
    
    dispatch(savePreferences({categories:selectedCategoryIds,topics:selectedTopicIds}))
    // if(statusPreferences==="succeeded"){
    //   setAlert({ type: 'success', message: 'Preferences Set Successfully' });
    //   dispatch(clearSelections())
    //   router.push("/")
    // }
  };
  
  useEffect(() => {
    if (statusPreferences === "succeeded") {
      router.push("/");
    }
  }, [router, statusPreferences]);

  if (status === 'loading') {
    return  <div className="flex justify-center items-center h-screen">
    <PuffLoader color="#36d7b7" size={100} />
  </div>
  }

  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }
  if (statusPreferences === 'failed') {
    return <div className="text-center mt-10 text-red-500">Error: {errorPreferences}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      {alert && <CustomAlert {...alert} onDismiss={() => setAlert(null)} />}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        {showTopics ? 'Choose Your Topics' : 'Choose Your Categories'}
      </h1>

      {/* Category Selection View */}
      {!showTopics && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelectCategory(category)}
                className={`px-4 py-2 rounded-md font-medium text-lg shadow-sm transition-colors duration-200 
                            ${selectedCategories.includes(category) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
              disabled={selectedCategories.length === 0} // Disable if no categories selected
            >
              Continue
            </button>
          </div>
        </>
      )}

      {/* Topics Selection View */}
      {showTopics && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`px-4 py-2 rounded-md font-medium text-lg shadow-sm transition-colors duration-200 
                            ${selectedTopics.includes(topic) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          {/* Back and Submit Buttons */}
          <div className="flex justify-between mt-10">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-200"
            >
              Back
            </button>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={statusPreferences==="loading"}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
            >
             {statusPreferences==="loading" ? "Loading..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySelection;



// "use client";
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic } from '@/redux/features/categorySlice';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'; // Import useRouter

// const CategorySelection = () => {
//   const dispatch = useDispatch();
//   const router = useRouter(); // Initialize router
//   const { categories, selectedCategories, selectedTopics, status, error } = useSelector((state) => state.categories);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleSelectCategory = (category) => {
//     if (selectedCategories.includes(category)) {
//       dispatch(unselectCategory(category));
//     } else {
//       dispatch(selectCategory(category));
//     }
//   };

//   const handleSelectTopic = (topic) => {
//     if (selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)) {
//       dispatch(unselectTopic(topic));
//     } else {
//       dispatch(selectTopic(topic));
//     }
//   };

//   const handleContinue = async () => {
//     const selectedCategoryIds = selectedCategories.map(category => category.id);
//     const selectedTopicIds = selectedTopics.map(topic => topic.id);
//     console.log(selectedCategoryIds, selectedTopicIds)
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preferences/`, {
//         categories: selectedCategoryIds,
//         topics: selectedTopicIds,
//       });

//       // After successful submission, use the router to navigate to the recommendations page
//       if (response.status === 201) {
//         router.push('/'); // Use router.push to navigate in the new App Router
//       }
//     } catch (error) {
//       console.error('Error saving user interests:', error);
//     }
//   };

//   if (status === 'loading') {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-xl mx-auto py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Select Your Interests</h1>

//       {/* Categories Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <div key={category.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">{category.name}</h2>
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleSelectCategory(category)}
//                 className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//             </div>
//             {selectedCategories.includes(category) && ( // Only show topics if the category is selected
//               <div className="grid grid-cols-2 gap-2">
//                 {category.topics.map((topic) => (
//                   <div key={topic.id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)}
//                       onChange={() => handleSelectTopic(topic)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     {/* Ensure you are rendering the topic name correctly */}
//                     <label className="ml-2 text-sm">{topic.name}</label>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Continue Button */}
//       <div className="text-center mt-8">
//         <button
//           onClick={handleContinue}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategorySelection;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic } from '@/redux/features/categorySlice';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const CategorySelection = () => {
//   const dispatch = useDispatch();
//   const router = useRouter(); // Initialize router
//   const { categories, selectedCategories, selectedTopics, status, error } = useSelector((state) => state.categories);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleSelectCategory = (category) => {
//     if (selectedCategories.includes(category)) {
//       dispatch(unselectCategory(category));
//     } else {
//       dispatch(selectCategory(category));
//     }
//   };

//   const handleSelectTopic = (topic) => {
//     console.log(topic,'topic', categories)
//     if (selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)) {
//       dispatch(unselectTopic(topic));
//     } else {
//       dispatch(selectTopic(topic));
//     }
//   };

//   const handleContinue = async () => {
//     const selectedCategoryIds = selectedCategories.map(category => category.id);
//     const selectedTopicIds = selectedTopics.map(topic => topic.id);

//     try {
//       const response = await axios.post(`${process.env.BACKEND_URL}/api/recommended-reads/`, {
//         categories: selectedCategoryIds,
//         topics: selectedTopicIds,
//       });

//       // After successful submission, use the router to navigate to the recommendations page
//       if (response.status === 200) {
//         router.push('/recommendations'); // Use router.push to navigate in the new App Router
//       }
//     } catch (error) {
//       console.error('Error saving user interests:', error);
//     }
//   };

//   if (status === 'loading') {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">Select Your Interests</h1>

//       {/* Categories Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <div key={category.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">{category.name}</h2>
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleSelectCategory(category)}
//                 className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//             </div>
//             {selectedCategories.includes(category) && ( // Only show topics if the category is selected
//               <div className="grid grid-cols-2 gap-2">
//                 {category.topics.map((topic) => (
//                   <div key={topic.id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)}
//                       onChange={() => handleSelectTopic(topic)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label className="ml-2 text-sm">{topic}</label>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Continue Button */}
//       <div className="text-center mt-8">
//         <button
//           onClick={handleContinue}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CategorySelection;
