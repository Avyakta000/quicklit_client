import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Async action to fetch user preferences
export const fetchPreferences = createAsyncThunk(
  'preferences/fetchPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preferences/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

// Async action to create or update user preferences
export const savePreferences = createAsyncThunk(
  'preferences/savePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/preferences/`, preferences);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    preferences: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearPreferences: (state) => {
      state.preferences = null;
      state.status = 'idle'
    },
    resetPreferencesStatus(state) {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch preferences
      .addCase(fetchPreferences.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Save preferences
      .addCase(savePreferences.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearPreferences, resetPreferencesStatus } = preferencesSlice.actions;
export default preferencesSlice.reducer;
