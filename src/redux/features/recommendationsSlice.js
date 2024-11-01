import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true
// Async thunk to fetch recommendations from the backend

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/recommended-reads/`); // Update with your backend API URL
      return response.data;
    } catch (error) {
      console.log('error recommendations ', error.response.data)
      return rejectWithValue(error.response.data.detail);
    }
  }
);

// Slice to manage recommendation state
const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    recommendations: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearRecommendations: (state) => {
      state.recommendations = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectRecommendationBySlug = (state, slug) => {
  return state.recommendations.recommendations.find(recommendations => recommendations.slug === slug);
}

export const { clearRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
