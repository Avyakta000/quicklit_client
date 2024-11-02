import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Async thunk to fetch all categories and topics
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState }) => {
    const { categories } = getState();

    // If already cached, skip the API call
    if (categories.allFetched) {
      return { categories: categories.categories, topics: categories.topics };
    }

    const response = await axiosInstance.get(`/api/categories-tags/`);
    return response.data;
  }
);

// Async thunk to fetch specific reads by category or tag
export const fetchReadsByCategory = createAsyncThunk(
  'categories/fetchReadsByCategory',
  async ({ key, value }, { getState }) => {
    const { categories } = getState();

    // Check if the specific category is already cached
    if (categories.cachedCategories[value]) {
      return categories.cachedCategories[value]; // Retrieve from cache
    }

    // If not cached, make the API request
    const response = await axiosInstance.get(`/api/reads/?${key}=${value}`); // Adjusted endpoint
    return { name: value, data: response.data }; // Return data for caching
  }
);

// Create the slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    topics: [],
    selectedCategories: [],
    selectedTopics: [],
    cachedCategories: {},  // Cache for specific categories by `value`
    allFetched: false,     // Flag to check if all categories and topics are fetched
    status: 'idle',
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategories.push(action.payload);
    },
    unselectCategory: (state, action) => {
      state.selectedCategories = state.selectedCategories.filter(
        category => category.id !== action.payload.id
      );
    },
    selectTopic: (state, action) => {
      state.selectedTopics.push(action.payload);
    },
    unselectTopic: (state, action) => {
      state.selectedTopics = state.selectedTopics.filter(
        topic => topic.id !== action.payload.id
      );
    },
    clearSelections: (state) => {
      state.selectedCategories = [];
      state.selectedTopics = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.categories;
        state.topics = action.payload.topics;
        state.allFetched = true;  // Mark all categories and topics as cached
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchReadsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReadsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Cache the specific category by `value`
        state.cachedCategories[action.payload.name] = action.payload.data;
      })
      .addCase(fetchReadsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { selectCategory, unselectCategory, selectTopic, unselectTopic, clearSelections } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;



// import axiosInstance from '@/utils/axiosInstance';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch categories and topics
// export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
//   const response = await axiosInstance.get(`/api/categories-tags/`);
//   return response.data; 
// });




// // Create the slice
// const categorySlice = createSlice({
//   name: 'categories',
//   initialState: {
//     categories: [],     
//     topics: [],           
//     selectedCategories: [], 
//     selectedTopics: [],   
//     status: 'idle',         
//     error: null,         
//   },
//   reducers: {
//     selectCategory: (state, action) => {
//       state.selectedCategories.push(action.payload);
//     },
//     unselectCategory: (state, action) => {
//       state.selectedCategories = state.selectedCategories.filter(category => category.id !== action.payload.id);
//     },
//     selectTopic: (state, action) => {
//       state.selectedTopics.push(action.payload);
//     },
//     unselectTopic: (state, action) => {
//       state.selectedTopics = state.selectedTopics.filter(topic => topic.id !== action.payload.id);
//     },
//      // New action to clear selected categories and topics
//     clearSelections: (state) => {
//       state.selectedCategories = [];
//       state.selectedTopics = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Set fetched categories and topics
//         state.categories = action.payload.categories; 
//         state.topics = action.payload.topics;        
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// // Export the actions
// export const { selectCategory, unselectCategory, selectTopic, unselectTopic, clearSelections } = categorySlice.actions;

// // Export the reducer
// export default categorySlice.reducer;

