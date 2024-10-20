// "use client";

"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic } from '@/redux/features/categorySlice';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter

const CategorySelection = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router
  const { categories, selectedCategories, selectedTopics, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      dispatch(unselectCategory(category));
    } else {
      dispatch(selectCategory(category));
    }
  };

  const handleSelectTopic = (topic) => {
    if (selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)) {
      dispatch(unselectTopic(topic));
    } else {
      dispatch(selectTopic(topic));
    }
  };

  const handleContinue = async () => {
    const selectedCategoryIds = selectedCategories.map(category => category.id);
    const selectedTopicIds = selectedTopics.map(topic => topic.id);
    console.log(selectedCategoryIds, selectedTopicIds)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preferences/`, {
        categories: selectedCategoryIds,
        topics: selectedTopicIds,
      });

      // After successful submission, use the router to navigate to the recommendations page
      if (response.status === 201) {
        router.push('/'); // Use router.push to navigate in the new App Router
      }
    } catch (error) {
      console.error('Error saving user interests:', error);
    }
  };

  if (status === 'loading') {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Interests</h1>

      {/* Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleSelectCategory(category)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            {selectedCategories.includes(category) && ( // Only show topics if the category is selected
              <div className="grid grid-cols-2 gap-2">
                {category.topics.map((topic) => (
                  <div key={topic.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)}
                      onChange={() => handleSelectTopic(topic)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    {/* Ensure you are rendering the topic name correctly */}
                    <label className="ml-2 text-sm">{topic.name}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CategorySelection;

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
