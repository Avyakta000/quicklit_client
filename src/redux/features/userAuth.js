"use client";
import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// Async Thunks
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/rest-auth/login/`, credentials);
  return response.data; // Return the user data
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axiosInstance.post(`/account/rest-auth/logout/`);
});

export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/rest-auth/registration/`, userData);
  return response.data;
});

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (authCode) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/rest-auth/google/`, { code: authCode });
  return response.data; // Return user data if successful
});

// export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/rest-auth/user/`);
//   return response.data; // Return the current authenticated user data
// });
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await axiosInstance.get(`/account/rest-auth/user/`);
  return response.data; // Return the current authenticated user data
});

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', 
    error: null,
    modalVisible: false,
    modalMessage: '', 
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';  
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.status = 'idle'; 
      state.error = null; 
      // state.modalVisible = false;
      // state.modalMessage = '';
    },
    showModal: (state, action) => {
      state.modalVisible = true;
      state.modalMessage = action.payload; 
    },
    hideModal: (state) => {
      state.modalVisible = false;
      state.modalMessage = ''; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        localStorage.setItem("q_exp", new Date(action.payload.refresh_token_expiration).toISOString());
        state.modalVisible = true;
        state.modalMessage = 'Login successful! Welcome back.';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'success';
        state.modalVisible = true;
        state.modalMessage = 'You have logged out successfully.';
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        localStorage.setItem("q_exp", new Date(action.payload.refresh_token_expiration).toISOString());
        state.modalVisible = true;
        state.modalMessage = 'Signup successful! Welcome!';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        localStorage.setItem("q_exp", new Date(action.payload.refresh_token_expiration).toISOString());
        state.modalVisible = true;
        state.modalMessage = 'Login with Google successful!';
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

console.log('Auth Slice Loaded'); // Add this line

// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state) => {
  return !!state.auth.user; // Only check if user data exists
};

// Export actions
export const { clearError, setUser, clearAuth, showModal, hideModal } = authSlice.actions;
export default authSlice.reducer;
