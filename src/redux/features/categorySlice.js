import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch categories and topics
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/`);
  return response.data;
});

// Create the slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    topics: {},
    selectedCategories: [],
    selectedTopics: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategories.push(action.payload);
    },
    unselectCategory: (state, action) => {
      state.selectedCategories = state.selectedCategories.filter(category => category.id !== action.payload.id);
    },
    selectTopic: (state, action) => {
      state.selectedTopics.push(action.payload);
    },
    unselectTopic: (state, action) => {
      state.selectedTopics = state.selectedTopics.filter(topic => topic.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add fetched categories and their topics
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { selectCategory, unselectCategory, selectTopic, unselectTopic } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;
