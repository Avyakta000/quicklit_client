"use client";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// Async Thunks
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('http://localhost:8000/account/rest-auth/login/', credentials);
  return response.data; // Return the user data
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axios.post('http://localhost:8000/account/rest-auth/logout/');
});

export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post('http://localhost:8000/account/rest-auth/registration', userData);
  return response.data;
});

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (authCode) => {
  const response = await axios.post('http://localhost:8000/account/rest-auth/google/', { code: authCode });
  return response.data; // Return user data if successful
});

// Fetch the current user data (for maintaining session across refresh)
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await axios.get('http://localhost:8000/account/rest-auth/user/');
  return response.data; // Return the current authenticated user data
});

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    modalVisible: false,
    modalMessage: '',  // Store the message to display in the modal
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
    },
    showModal: (state, action) => {
      state.modalVisible = true;
      state.modalMessage = action.payload; // Set the message for the modal
    },
    hideModal: (state) => {
      state.modalVisible = false;
      state.modalMessage = '';  // Clear the message when the modal is hidden
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.user = action.payload;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    };

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.modalVisible = true;
        state.modalMessage = 'Login successful! Welcome back.';
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.modalVisible = true;
        state.modalMessage = 'You have logged out successfully.';
      })

      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.modalVisible = true;
        state.modalMessage = 'Signup successful! Welcome!';
      })
      .addCase(signupUser.rejected, handleRejected)

      .addCase(loginWithGoogle.pending, handlePending)
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.modalVisible = true;
        state.modalMessage = 'Login with Google successful!';
      })
      .addCase(loginWithGoogle.rejected, handleRejected)

      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, handleFulfilled)
      .addCase(fetchCurrentUser.rejected, handleRejected);
  },
});

// // Selector to check if the user is authenticated
export const selectIsAuthenticated = (state) => {
  return !!state.auth.user; // Only check if user data exists
};

// Export actions
export const { clearError, setUser, clearAuth, showModal, hideModal } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// // Async Thunks
// export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
//   const response = await axios.post('http://localhost:8000/account/rest-auth/login/', credentials);
//   return response.data; // Return the user data
// });

// export const logoutUser = createAsyncThunk('auth/logout', async () => {
//   await axios.post('http://localhost:8000/account/rest-auth/logout/');
// });

// export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
//   const response = await axios.post('http://localhost:8000/account/rest-auth/registration/', userData);
//   return response.data;
// });

// export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (authCode) => {
//   const response = await axios.post('http://localhost:8000/account/rest-auth/google/', { code: authCode });
//   return response.data; // Return user data if successful
// });

// // Fetch the current user data (for maintaining session across refresh)
// export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
//   const response = await axios.get('http://localhost:8000/account/rest-auth/user/');
//   return response.data; // Return the current authenticated user data
// });

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,    // Store user data
//     loading: false,
//     error: null,
//     modalVisible: false, 
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload; // Setter for user data
//     },
//     clearAuth: (state) => {
//       state.user = null; // Clear user data on logout
//     },
//     showModal: (state) => {
//       state.modalVisible = true;   // Set modal visibility to true
//     },
//     hideModal: (state) => {
//       state.modalVisible = false;  // Set modal visibility to false
//     }, 
//   },
//   extraReducers: (builder) => {
//     const handlePending = (state) => {
//       state.loading = true;
//       state.error = null;
//     };

//     const handleFulfilled = (state, action) => {
//       state.loading = false;
//       state.user = action.payload; // Assuming the user data is in action.payload
//     };

//     const handleRejected = (state, action) => {
//       state.loading = false;
//       state.error = action.error.message; // Capture the error message
//     };

//     builder
//       .addCase(loginUser.pending, handlePending)
//       .addCase(loginUser.fulfilled, handleFulfilled)
//       .addCase(loginUser.rejected, handleRejected)

//       .addCase(logoutUser.fulfilled, (state) => {
//         state.user = null; // Clear user data on logout
//       })

//       .addCase(signupUser.pending, handlePending)
//       .addCase(signupUser.fulfilled, handleFulfilled)
//       .addCase(signupUser.rejected, handleRejected)

//       .addCase(loginWithGoogle.pending, handlePending)
//       .addCase(loginWithGoogle.fulfilled, handleFulfilled)
//       .addCase(loginWithGoogle.rejected, handleRejected)

//       // Handle fetchCurrentUser
//       .addCase(fetchCurrentUser.pending, handlePending)
//       .addCase(fetchCurrentUser.fulfilled, handleFulfilled)
//       .addCase(fetchCurrentUser.rejected, handleRejected);
//   },
// });

// // Selector to check if the user is authenticated
// export const selectIsAuthenticated = (state) => {
//   return !!state.auth.user; // Only check if user data exists
// };

// // Export actions and reducer
// export const { clearError, setUser, clearAuth } = authSlice.actions;
// export default authSlice.reducer;