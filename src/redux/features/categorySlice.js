import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch categories and topics
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosInstance.get(`/api/categories-tags/`);
  return response.data; 
});

// Create the slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],     
    topics: [],           
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
     // New action to clear selected categories and topics
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
        // Set fetched categories and topics
        state.categories = action.payload.categories; 
        state.topics = action.payload.topics;        
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the actions
export const { selectCategory, unselectCategory, selectTopic, unselectTopic, clearSelections } = categorySlice.actions;

// Export the reducer
export default categorySlice.reducer;

