"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategory, unselectCategory, selectTopic, unselectTopic, clearSelections } from '@/redux/features/categorySlice';
import { useRouter } from 'next/navigation';
import { savePreferences } from '@/redux/features/preferenceSlice';
import { PuffLoader } from 'react-spinners';
import { CustomAlert } from '@/components/Alert';
import { resetPreferencesStatus } from '@/redux/features/preferenceSlice'; 
import { fetchRecommendations } from '@/redux/features/recommendationsSlice';

const CategorySelection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [alert, setAlert] = useState(null); 
  const { categories, topics, selectedCategories, selectedTopics, status, error } = useSelector((state) => state.categories);
  const { status:statusPreferences, error:errorPreferences } = useSelector((state) => state.preferences);
  
  const [showTopics, setShowTopics] = useState(false); // Toggle between categories and topics view

  useEffect(() => {
    // Reset preferences status when the component mounts
    dispatch(resetPreferencesStatus());
  }, [dispatch]);

  useEffect(() => {
    if(status==="idle"){
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (statusPreferences === "succeeded") {
      setAlert({ type: 'success', message: 'Preferences Set Successfully' });
      dispatch(clearSelections());
      dispatch(fetchRecommendations())
      router.push("/");
    }
  }, [router, statusPreferences, dispatch]);


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
   
  };
  


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

